import { NextFunction, Request, Response } from 'express';
import { createMessage, findAllMessages } from '@service/message.service';
import { StatusCodes } from 'http-status-codes';
import logger from '@server/config/logger';

export const getAllMessagesHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const messages = await findAllMessages();
    res.status(StatusCodes.OK).json({
      status: 'success',
      result: messages.length,
      data: {
        messages,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const createMessageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    logger.error(req.body);
    const message = await createMessage({
      sender: req.body.sender,
      receiver: req.body.receiver,
      body: req.body.body,
    });
    res.status(StatusCodes.OK).json({
      status: 'success',
      data: {
        message,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
