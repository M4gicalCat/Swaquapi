import { Route } from '../types/Route';
import { authMiddleware } from '../utils';
import db from '../db.config';

export const routes: Route[] = [
  {
    method: 'post',
    url: '/gorgee',
    middlewares: [authMiddleware],
    handler: async (req, res) => {
      const { id } = req;
      const { gorgee } = req.body;
      await db.none(
        `INSERT INTO gorgee (swallower_id, quantity, date) VALUES ($[id], $[gorgee], NOW())`,
        { id, gorgee },
      );
      const { glouglou } = await db.one(
        `SELECT SUM(quantity) AS glouglou FROM gorgee WHERE swallower_id = $[id] AND EXTRACT(DAY FROM date) = EXTRACT(DAY FROM NOW())`,
        { id },
      );
      res.json({ glouglou: +glouglou });
    },
  },
];
