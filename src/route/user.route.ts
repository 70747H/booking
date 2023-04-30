import express from 'express';
import {
  getAllUsersHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from '@controller/user.controller';
import { deserializeUser } from '@server/middleware/deserialize-user.middleware';
import { checkAuth } from '@middleware/check-auth.middleware';
import { restrictTo } from '@middleware/restrict-to.middleware';
import { updateUserSchema } from '@schema/user.schema';
import { validate } from '@middleware/validate.middleware';

const router = express.Router();
router.use(deserializeUser, checkAuth);

router.get('/', restrictTo('admin'), getAllUsersHandler);
router.get('/:id', getUserHandler);
router.patch('/:id', validate(updateUserSchema), updateUserHandler);
router.delete('/:id', deleteUserHandler);

export default router;
