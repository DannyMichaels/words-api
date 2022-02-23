import express, { Application } from 'express';
import { Pool } from 'mysql2/promise';

// middleware
import poolMiddleware from './middleware/pool';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

// utils
import dbConnect from './db/dbConnect';

// views
import wordRoutes from './routes/words.routes';
import viewRoutes from './routes/views.routes';
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
  const pool: Pool = await dbConnect(); // create mysql pool

  app.use(cors());
  app.use(helmet()); // security with express-helmet

  app.use(express.json()); // because body-parser is deprecated

  app.use(logger('dev'));
  app.use(poolMiddleware(pool)); // use mysql pool for queries in controllers by passing pool to the request in the middleware

  app.set('view engine', 'pug'); // for views (specifically landing page)
  app.set('views', './views'); // views directory

  app.use('/', viewRoutes);
  app.use('/api', wordRoutes); // getting the words

  return app;
}
