import express from 'express';
import { deserializeUser } from '@middleware/deserialize-user.middleware';
import { checkAuth } from '@middleware/check-auth.middleware';
import {
  getAllReservationHandler,
  getReservationHandler,
  createReservationHandler,
  updateReservationHandler,
  deleteReservationHandler,
} from '@controller/reservation.controller';
import { validate } from '@middleware/validate.middleware';
import {
  filterReservationSchema,
  createReservationSchema,
  updateReservationSchema,
} from '@schema/reservation.schema';

const router = express.Router();
router.use(deserializeUser, checkAuth);

router.get('/', validate(filterReservationSchema), getAllReservationHandler);
router.get('/:id', getReservationHandler);
router.post('/', validate(createReservationSchema), createReservationHandler);
router.patch(
  '/:id',
  validate(updateReservationSchema),
  updateReservationHandler,
);
router.delete('/:id', deleteReservationHandler);

export default router;
