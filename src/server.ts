import express, { Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import wordRoutes from './routes/words.routes';
import { Pool } from 'mysql2/promise';
import poolMiddleware from './middleware/pool';
import dbConnect from './db/dbConnect';

declare global {
  namespace Express {
    interface Request {
      // add pool to request interface so can be used in middleware
      pool?: Pool;
    }
  }
}

export default async function createServer() {
  const app: Application = express();
  const pool: Pool = await dbConnect();

  app.use(cors());
  app.use(helmet()); // security with express-helmet

  app.use(express.json()); // because body-parser is deprecated

  app.use(logger('dev'));
  app.use(poolMiddleware(pool)); // use mysql pool for queries.

  app.use('/api', wordRoutes);

  return app;
}
