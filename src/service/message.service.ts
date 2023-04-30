import { FilterQuery, QueryOptions } from 'mongoose';
import messageModel, { Message } from '@model/message.model';

export const createMessage = async (input: Partial<Message>) => {
  const message = await messageModel.create(input);
  return message.toJSON();
};

export const findMessageById = async (id: string) => {
  const message = await messageModel.findById(id).lean();
  return message;
};

export const findAllMessages = async () => {
  return await messageModel.find();
};

export const findMessage = async (
  query: FilterQuery<Message>,
  options: QueryOptions = {},
) => {
  return await messageModel.findOne(query, {}, options);
};
