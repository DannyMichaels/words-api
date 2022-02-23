import { Request, Response } from 'express';
import { Pool } from 'mysql2/promise';

// connect pool in create server func
const poolMiddleware = (pool: Pool) => {
  return (req: Request, res: Response, next: any) => {
    try {
      req.pool = pool;
      next();
    } catch (err) {
      console.error('something wrong with auth + admin middleware');
      res.status(500).json({ error: 'Server Error' });
    }
  };
};

export default poolMiddleware;
