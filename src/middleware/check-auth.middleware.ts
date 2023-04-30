import { NextFunction, Request, Response } from 'express';

export const checkAuth = (_req: Request, res: Response, next: NextFunction) => {
  try {
    const user = res.locals.user;
    if (!user) {
      next(new Error(`Invalid token or session has expired`));
    }

    next();
  } catch (err: any) {
    next(err);
  }
};
