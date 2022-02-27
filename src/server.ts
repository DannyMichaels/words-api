import express, { Application } from 'express';
import { Pool } from 'mysql2/promise';

// middleware
import poolMiddleware from './middleware/pool';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';

// utils
import dbConnect from './db/dbConnect';
import path from 'path';

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
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://gitcat-words-api.herokuapp.com',
          ],
          styleSrc: [
            "'self'",
            'https://fonts.googleapis.com',
            "'unsafe-inline'",
          ],
          imgSrc: ["'self'", 'https://*.com'],
          fontSrc: ["'self'", 'https://*.com', 'data:'],
        },
      },
    })
  );

  app.use(express.json());

  // @ts-ignore
  app.use(bodyParser());

  app.use(logger('dev'));
  app.use(poolMiddleware(pool)); // use mysql pool for queries in controllers by passing pool to the request in the middleware

  app.set('view engine', 'pug'); // for views (specifically landing page)
  app.use(express.static(path.join(__dirname, '../public'))); // css and images for views.

  app.use('/', viewRoutes);
  app.use('/api', wordRoutes); // getting the words

  return app;
}
