import jwt from 'jsonwebtoken';
import { SECRET } from './secret';

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(`Unauthorized${message ? `: ${message}` : ''}`);
  }
}

export class BadRequestError extends Error {
  constructor(...errors: string[]) {
    super(errors.join(', '));
  }
}

export const authMiddleware = (req: any, res: any, next: () => void) => {
  const { token } = req.body || req.query;
  try {
    const { id } = jwt.verify(token, SECRET) as { id: number };
    req.id = id;
    console.log('authenticated => ', id);
    next();
  } catch (e) {
    throw new UnauthorizedError();
  }
};

export const getUserQuery = `
    SELECT s.id, s.username, CASE WHEN SUM(g.quantity) IS NOT NULL THEN SUM(g.quantity) ELSE 0  END AS glouglou
    FROM swallower s
             LEFT JOIN gorgee g ON s.id = g.swallower_id AND EXTRACT(DAY FROM g.date) = EXTRACT(DAY FROM NOW())
    WHERE
        s.id = $[id]
    GROUP BY s.id, s.username
`;
