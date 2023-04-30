import { Status } from '@enum/reservation-status.enum';
import { object, string, TypeOf, nativeEnum } from 'zod';

export const filterReservationSchema = object({
  query: object({
    guest: string({ required_error: 'guest is required' }).optional(),
    property: string({ required_error: 'property is required' }).optional(),
    status: string().optional().optional(),
  }),
});

export const createReservationSchema = object({
  body: object({
    guest: string({ required_error: 'guest is required' }),
    property: string({ required_error: 'property is required' }),
    status: nativeEnum(Status).optional(),
    startDate: string({ required_error: 'startDate is required' }).datetime({
      precision: 3,
    }),
    endDate: string({ required_error: 'endDate is required' }).datetime({
      precision: 3,
    }),
  }),
});

export const updateReservationSchema = object({
  body: object({
    status: nativeEnum(Status).optional(),
  }),
});

export type FilterReservationInput = TypeOf<
  typeof filterReservationSchema
>['query'];

export type CreateReservationInput = TypeOf<
  typeof createReservationSchema
>['body'];

export type UpdateReservationInput = TypeOf<
  typeof updateReservationSchema
>['body'];
