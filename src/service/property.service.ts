import { FilterQuery, QueryOptions } from 'mongoose';
import propertyModel, { Property } from '@model/property.model';
import { UpdatePropertySchemaInput } from '@server/schema/property.schema';

export const createProperty = async (input: Partial<Property>) => {
  const property = await propertyModel.create(input);
  return property.toJSON();
};

export const findPropertyById = async (id: string) => {
  const property = await propertyModel.findById(id).lean();
  return property;
};

export const findAllProperties = async () => {
  return await propertyModel.find({ deletedAt: null });
};

export const findProperty = async (
  query: FilterQuery<Property>,
  options: QueryOptions = {},
) => {
  return await propertyModel.findOne(
    { deletedAt: null, ...query },
    {},
    options,
  );
};

export const updateProperty = async (
  id: string,
  updateObject: UpdatePropertySchemaInput,
) => {
  return await propertyModel.updateOne({ _id: id }, updateObject);
};

export const deleteProperty = async (id: string) => {
  return await propertyModel.deleteOne({ _id: id });
};
