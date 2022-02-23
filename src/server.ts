import express, { Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import wordRoutes from './routes/words.routes';
import { Pool } from 'mysql2/promise';
import poolMiddleware from './middleware/pool';

declare global {
  namespace Express {
    interface Request {
      pool?: Pool;
    }
  }
}

export default function createServer() {
  const app: Application = express();

  app.use(cors());
  app.use(helmet()); // security with express-helmet

  app.use(express.json()); // because body-parser is deprecated

  app.use(logger('dev'));
  app.use(poolMiddleware); // use mysql pool for queries.

  app.use('/api', wordRoutes);

  return app;
}
