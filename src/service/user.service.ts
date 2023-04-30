import { omit } from 'lodash';
import { FilterQuery } from 'mongoose';
import userModel, { User } from '../models/user.model';
import { excludedFields } from '@controller/auth.controller';
import { signJwt } from '@util/jwt';
import { DocumentType } from '@typegoose/typegoose';

// CreateUser service
export const createUser = async (input: Partial<User>) => {
  const user = await userModel.create(input);
  return omit(user.toJSON(), excludedFields);
};

export const findUserById = async (id: string) => {
  const user = await userModel.findById(id).lean();
  return omit(user, excludedFields);
};

export const findAllUsers = async () => {
  return await userModel.find();
};

export const findUser = async (query: FilterQuery<User>) => {
  return await userModel.findOne(query).select('+password');
};

export const updateUser = async (id: string, updateObject: object) => {
  return await userModel.updateOne({ _id: id }, updateObject);
};

export const deleteUser = async (id: string) => {
  return await userModel.deleteOne({ _id: id });
};

export const signToken = async (user: DocumentType<User>) => {
  const accessToken = signJwt(
    { sub: user._id },
    {
      expiresIn: `${process.env.ACCESS_TOKEN_EXPIRES_IN}m`,
    },
  );

  // Return access token
  return { accessToken };
};
