import { NextFunction, Request, Response } from 'express';
import { findUserById } from '@service/user.service';
import { verifyJwt } from '@util/jwt';

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    let accessToken: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      accessToken = req.headers.authorization.split(' ')[1];
    }

    if (!accessToken) {
      return next(new Error('You are not logged in'));
    }

    const decoded = verifyJwt<{ sub: string }>(accessToken);

    if (!decoded) {
      return next(new Error(`Invalid token or user doesn't exist`));
    }

    const user = await findUserById(decoded.sub);

    if (!user) {
      return next(new Error(`User with that token no longer exist`));
    }

    // This is really important (Helps us know if the user is logged in from other controllers)
    // You can do: (req.user or res.locals.user)
    res.locals.user = user;

    next();
  } catch (err: any) {
    next(err);
  }
};
