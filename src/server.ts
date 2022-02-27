import express, { Application } from 'express';
import { Pool } from 'mysql2/promise';

// middleware
import poolMiddleware from './middleware/pool';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

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
      csrfToken: () => string;
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

  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(
    express.urlencoded({ extended: true })
  ); /* bodyParser.urlencoded() is deprecated */

  // express.json and bodyparser have to be used before these 2 (cookieparser and csrf) are used
  app.use(cookieParser());
  // const csrfProtection = csrf({ cookie: true });
  // app.use(csrfProtection);

  app.use(logger('dev'));
  app.use(poolMiddleware(pool)); // use mysql pool for queries in controllers by passing pool to the request in the middleware

  app.set('view engine', 'pug'); // for views (specifically landing page)
  app.use(express.static(path.join(__dirname, '../public'))); // css and images for views.

  app.use('/', viewRoutes);
  app.use('/api', wordRoutes); // getting the words

  return app;
}
