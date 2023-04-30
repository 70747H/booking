import { object, string, TypeOf } from 'zod';

export const createPropertySchema = object({
  body: object({
    owner: string({ required_error: 'owner is required' }),
    name: string({ required_error: 'name is required' }),
  }),
});

export const updatePropertySchema = object({
  body: object({
    name: string().optional(),
  }),
});

export type CreatePropertySchemaInput = TypeOf<
  typeof createPropertySchema
>['body'];

export type UpdatePropertySchemaInput = TypeOf<
  typeof updatePropertySchema
>['body'];
