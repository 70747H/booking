import { NextFunction, Request, Response } from 'express';
import {
  createProperty,
  findAllProperties,
  findPropertyById,
  updateProperty,
  deleteProperty,
} from '@service/property.service';
import { StatusCodes } from 'http-status-codes';

export const getAllPropertiesHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const properties = await findAllProperties();
    res.status(StatusCodes.OK).json({
      status: 'success',
      result: properties.length,
      data: {
        properties,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getPropertyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const property = await findPropertyById(req.params.id);
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        property,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const createPropertyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const property = await createProperty({
      name: req.body.name,
      owner: req.body.owner,
    });
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        property,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updatePropertyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await updateProperty(req.params.id, {
      name: req.body.name,
    });
    res.status(StatusCodes.OK).json();
  } catch (err: any) {
    next(err);
  }
};

export const deletePropertyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteProperty(req.params.id);
    res.status(StatusCodes.OK).json();
  } catch (err: any) {
    next(err);
  }
};
