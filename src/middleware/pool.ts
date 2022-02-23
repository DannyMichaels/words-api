import { Request, Response } from 'express';
import { Pool } from 'mysql2/promise';
import dbConnect from './../db/dbConnect';

const poolMiddleware = async (req: Request, res: Response, next: any) => {
  try {
    const pool: Pool = await dbConnect();
    req.pool = pool;
    next();
  } catch (err) {
    console.error('something wrong with auth + admin middleware');
    res.status(500).json({ error: 'Server Error' });
  }
};

export default poolMiddleware;
