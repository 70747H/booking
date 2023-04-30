import { object, string, TypeOf } from 'zod';

export const createMessageSchema = object({
  body: object({
    sender: string({ required_error: 'sender is required' }),
    receiver: string({ required_error: 'receiver is required' }),
    body: string({ required_error: 'body is required' }),
  }),
});

export type CreateMessageSchemaInput = TypeOf<
  typeof createMessageSchema
>['body'];
