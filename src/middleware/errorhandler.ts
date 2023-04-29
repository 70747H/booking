import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) return next(error);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error.message);
};

export default errorHandler;
