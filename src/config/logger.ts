import { Logger } from '@tsed/logger';

const logger = new Logger();
logger.appenders
  .set('std-log', {
    type: 'stdout',
    levels: ['debug', 'info', 'trace', 'warn', 'error', 'fatal'],
  })
  .set('error-log', {
    type: 'stderr',
    levels: ['fatal', 'error', 'warn'],
    layout: {
      type: 'pattern',
      pattern: '%d %p %c %X{user} %m%n',
    },
  });

export default logger;
