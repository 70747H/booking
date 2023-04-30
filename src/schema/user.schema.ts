import { UserType } from '@enum/user-type.enum';
import { nativeEnum, object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    name: string({ required_error: 'Name is required' }),
    password: string({ required_error: 'Password is required' })
      .min(8, 'Password must be more than 8 characters')
      .max(32, 'Password must be less than 32 characters'),
    passwordConfirm: string({ required_error: 'Please confirm your password' }),
    phone: string({ required_error: 'Phone is required' }),
    type: nativeEnum(UserType),
  }).refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  }),
});

export const updateUserSchema = object({
  body: object({
    name: string().optional(),
    phone: string().optional(),
  }),
});

export const loginUserSchema = object({
  body: object({
    name: string({ required_error: 'name is required' }),
    password: string({ required_error: 'Password is required' }).min(
      8,
      'Invalid name or password',
    ),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type UpdateUserInput = TypeOf<typeof updateUserSchema>['body'];
export type LoginUserInput = TypeOf<typeof loginUserSchema>['body'];
