import { Route } from '../types/Route';
import db from '../db.config';
import bcrypt from 'bcrypt';
import { UnauthorizedError } from '../utils';
import jwt from 'jsonwebtoken';
import { SECRET } from '../secret';

export const routes: Route[] = [
  {
    method: 'get',
    url: '/auth/login',
    handler: async (req, res) => {
      const { username, password } = req.query;
      let swallower;
      try {
        swallower = await db.one(
          'SELECT id, username, password FROM swallower WHERE username = $[username]',
          { username },
        );
      } catch (e) {
        throw new UnauthorizedError();
      }
      const isPasswordCorrect = await bcrypt.compare(
        password,
        swallower.password,
      );
      if (!isPasswordCorrect) {
        throw new UnauthorizedError();
      }
      delete swallower.password;
      res.json({
        swallower,
        token: jwt.sign({ id: swallower.id }, SECRET, {
          expiresIn: '14d',
        }),
      });
    },
  },
  {
    method: 'get',
    url: '/auth/refresh',
    handler: async (req, res) => {
      const { token } = req.query;
      const { id } = jwt.verify(token, SECRET) as { id: number };
      let swallower;
      try {
        swallower = await db.one(
          'SELECT id, username FROM swallower WHERE id = $[id]',
          { id },
        );
      } catch (e) {
        throw new UnauthorizedError();
      }

      res.json({
        swallower,
        token: jwt.sign({ id: swallower.id }, SECRET, {
          expiresIn: '14d',
        }),
      });
    },
  },
  {
    method: 'post',
    url: '/auth/register',
    handler: async (req, res) => {
      const { name, password } = req.body;
      if (!name?.length || !password?.length) {
        throw new UnauthorizedError();
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const swallower = await db.one(
        'INSERT INTO swallower (username, password) VALUES ($[name], $[password]) RETURNING username, id',
        { name, password: hashedPassword },
      );
      res.json({
        swallower,
        token: jwt.sign({ id: swallower.id }, SECRET, {
          expiresIn: '14d',
        }),
      });
    },
  },
];
