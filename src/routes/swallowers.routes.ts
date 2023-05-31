import db from '../db.config';
import { Route } from '../types/Route';
import { authMiddleware, getUserQuery } from '../utils';

export const routes: Route[] = [
  {
    method: 'get',
    url: '/swallowers/:id',
    handler: async (req, res) => {
      const { id } = req.params;
      const swallowers = await db.any(getUserQuery, { id });
      res.json(swallowers);
    },
  },
  {
    method: 'get',
    url: '/swallowers',
    middlewares: [authMiddleware],
    handler: async (req, res) => {
      const swallower = await db.one(getUserQuery, { id: req.id });
      res.json(swallower);
    },
  },
  {
    method: 'delete',
    url: '/swallowers',
    middlewares: [authMiddleware],
    handler: async (req, res) => {
      await db.none('DELETE FROM swallower WHERE id = $[id]', { id: req.id });
      res.json({ message: 'ok' });
    },
  },
];
