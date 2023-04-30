import {
  getModelForClass,
  index,
  modelOptions,
  prop,
  Ref,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { User } from '@model/user.model';
import { Property } from '@model/property.model';
import { Status } from '@enum/reservation-status.enum';

@index({ guest: 1, property: 1 })
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Reservation {
  @prop({
    type: Types.ObjectId,
    ref: () => User,
    required: true,
  })
  guest: Ref<User>;

  @prop({
    type: Types.ObjectId,
    ref: () => Property,
    required: true,
  })
  property: Ref<Property>;

  @prop({
    type: String,
    required: true,
    default: Status.CHECKED_OUT,
  })
  status: string;

  @prop({
    type: Date,
    required: true,
  })
  startDate: Date;

  @prop({
    type: Date,
    required: true,
  })
  endDate: Date;
}

const reservationModel = getModelForClass(Reservation);
export default reservationModel;
