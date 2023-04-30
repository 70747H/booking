import { FilterQuery, QueryOptions } from 'mongoose';
import reservationModel, { Reservation } from '@model/reservation.model';
import { FilterReservationInput } from '@server/schema/reservation.schema';

export const createReservation = async (input: Partial<Reservation>) => {
  const reservation = await reservationModel.create(input);
  return reservation.toJSON();
};

export const findReservationById = async (id: string) => {
  const reservation = await reservationModel.findById(id).lean();
  return reservation;
};

export const findAllReservations = async (filter: FilterReservationInput) => {
  return await reservationModel.find(filter).populate(['guest', 'property']);
};

export const findReservation = async (
  query: FilterQuery<Reservation>,
  options: QueryOptions = {},
) => {
  return await reservationModel.findOne(query, {}, options);
};

export const updateReservation = async (id: string, updateObject: object) => {
  return await reservationModel.updateOne({ _id: id }, updateObject);
};

export const deleteReservation = async (id: string) => {
  return await reservationModel.deleteOne({ _id: id });
};
