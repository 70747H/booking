import express from 'express';
import { deserializeUser } from '@middleware/deserialize-user.middleware';
import { checkAuth } from '@middleware/check-auth.middleware';
import {
  getAllMessagesHandler,
  createMessageHandler,
} from '@controller/message.controller';
import { validate } from '@middleware/validate.middleware';
import { createMessageSchema } from '@schema/message.schema';

const router = express.Router();
router.use(deserializeUser, checkAuth);

router.get('/', getAllMessagesHandler);
router.post('/', validate(createMessageSchema), createMessageHandler);

export default router;
