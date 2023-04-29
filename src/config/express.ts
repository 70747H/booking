import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from '@middleware/errorhandler';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json());
  app.use(helmet());

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  app.use(errorHandler);

  return app;
};

export { createServer };
