import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import errorHandler from '@server/middleware/general-error-handler.middleware';
import userRouter from '@route/user.route';
import authRouter from '@route/auth.route';
import reservationRouter from '@route/reservation.route';
import propertyRouter from '@route/property.route';
import messageRouter from '@route/message.route';

const createServer = (): express.Application => {
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.json({ limit: '10kb' }));
  app.use(helmet());

  app.use('/api/auth', authRouter);
  app.use('/api/users', userRouter);
  app.use('/api/reservations', reservationRouter);
  app.use('/api/properties', propertyRouter);
  app.use('/api/messages', messageRouter);

  app.get('/health', (_req, res) => {
    res.send('UP');
  });

  app.use(errorHandler);

  return app;
};

export { createServer };
