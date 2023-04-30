import { NextFunction, Request, Response } from 'express';
import {
  createReservation,
  findAllReservations,
  findReservationById,
  updateReservation,
  deleteReservation,
} from '@service/reservation.service';
import { StatusCodes } from 'http-status-codes';

export const getAllReservationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reservations = await findAllReservations(req.query);
    res.status(StatusCodes.OK).json({
      status: 'success',
      result: reservations.length,
      data: {
        reservations,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getReservationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reservation = await findReservationById(req.params.id);
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        reservation,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateReservationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await updateReservation(req.params.id, {
      status: req.body.status,
    });
    res.status(StatusCodes.OK).json();
  } catch (err: any) {
    next(err);
  }
};

export const deleteReservationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteReservation(req.params.id);
    res.status(StatusCodes.OK).json();
  } catch (err: any) {
    next(err);
  }
};

export const createReservationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reservation = await createReservation({
      guest: req.body.guest,
      property: req.body.property,
      status: req.body.status,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    });
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        reservation,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
