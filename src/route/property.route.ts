import express from 'express';
import { deserializeUser } from '@middleware/deserialize-user.middleware';
import { checkAuth } from '@middleware/check-auth.middleware';
import {
  getAllPropertiesHandler,
  createPropertyHandler,
  getPropertyHandler,
  updatePropertyHandler,
  deletePropertyHandler,
} from '@controller/property.controller';
import { validate } from '@middleware/validate.middleware';
import {
  createPropertySchema,
  updatePropertySchema,
} from '@schema/property.schema';

const router = express.Router();
router.use(deserializeUser, checkAuth);

router.get('/', getAllPropertiesHandler);
router.get('/:id', getPropertyHandler);
router.post('/', validate(createPropertySchema), createPropertyHandler);
router.patch('/:id', validate(updatePropertySchema), updatePropertyHandler);
router.delete('/:id', deletePropertyHandler);

export default router;
