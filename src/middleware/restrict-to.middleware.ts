import { NextFunction, Request, Response } from 'express';

export const restrictTo =
  (...allowedRoles: string[]) =>
  (_req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (!allowedRoles.includes(user.role)) {
      return next(new Error('You are not allowed to perform this action'));
    }

    next();
  };
