import { NextFunction, Request, Response } from 'express';
import { CreateUserInput, LoginUserInput } from '@schema/user.schema';
import { createUser, findUser, signToken } from '@service/user.service';
import { StatusCodes } from 'http-status-codes';
import { UserType } from '@server/enum/user-type.enum';
import logger from '@server/config/logger';

export const excludedFields = ['password', '__v'];

export const registerHandler = async (
  req: Request<object, object, CreateUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await createUser({
      name: req.body.name,
      password: req.body.password,
      phone: req.body.phone,
      type: req.body.type,
      role: req.body.type === UserType.USER ? UserType.USER : UserType.OWNER,
    });

    return res.status(StatusCodes.CREATED).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    logger.error(err);
    if (err.code === 11000) {
      return res.status(StatusCodes.CONFLICT).json({
        status: 'fail',
        message: 'Name already exist',
      });
    }
    return next(err);
  }
};

export const loginHandler = async (
  req: Request<object, object, LoginUserInput>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await findUser({ name: req.body.name });

    if (
      !user ||
      !(await user.comparePasswords(user.password, req.body.password))
    ) {
      return next(new Error('Invalid name or password'));
    }

    const { accessToken } = await signToken(user);

    res.status(StatusCodes.OK).json({
      status: 'success',
      accessToken,
    });
  } catch (err: any) {
    next(err);
  }
};
