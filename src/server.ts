import express, { Application } from 'express';
import logger from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import wordRoutes from './routes/words.routes';

export default function createServer() {
  const app: Application = express();

  app.use(cors());
  app.use(helmet()); // security with express-helmet

  app.use(express.json()); // because body-parser is deprecated

  app.use(logger('dev'));

  app.use('/api', wordRoutes);

  return app;
}
