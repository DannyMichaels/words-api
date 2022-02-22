import express from 'express';
import logger from 'logger';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import wordRoutes from './routes/words.routes';

export default function createServer() {
  const app = express();

  app.use(cors());
  app.use(helmet()); // security with express-helmet

  app.use(bodyParser.json({ limit: '2mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '2mb' }));

  app.use(logger('dev'));

  app.use('/api', wordRoutes);

  return app;
}
