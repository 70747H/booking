require('module-alias/register');
import * as dotenv from 'dotenv';
import { createServer } from '@server/config/express';
import { AddressInfo } from 'net';
import http from 'http';
import logger from '@config/logger';

dotenv.config();

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || '5001';

const startServer = () => {
  const app = createServer();
  const server = http.createServer(app).listen({ host, port }, () => {
    const addressInfo = server.address() as AddressInfo;
    logger.info(
      `Server ready at http://${addressInfo.address}:${addressInfo.port}`,
    );
  });

  const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
  signalTraps.forEach((type) => {
    process.once(type, async () => {
      console.log(`process.once ${type}`);

      server.close(() => {
        console.log('HTTP server closed');
      });
    });
  });
};

startServer();
