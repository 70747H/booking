import { NextFunction, Request, Response } from 'express';
import {
  findAllUsers,
  findUser,
  updateUser,
  deleteUser,
} from '@service/user.service';
import { StatusCodes } from 'http-status-codes';

export const getAllUsersHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await findAllUsers();
    res.status(StatusCodes.OK).json({
      status: 'success',
      result: users.length,
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await findUser({ _id: req.params.id });
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updateObject = {
      name: req.body.name,
      phone: req.body.phone,
    };
    await updateUser(req.params.id, updateObject);

    res.status(StatusCodes.OK).json();
  } catch (err: any) {
    next(err);
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteUser(req.params.id);
    res.status(StatusCodes.OK).json();
  } catch (err: any) {
    next(err);
  }
};
