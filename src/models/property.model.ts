import {
  Ref,
  getModelForClass,
  modelOptions,
  prop,
} from '@typegoose/typegoose';
import { Types } from 'mongoose';
import { User } from '@model/user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Property {
  @prop({ type: String, unique: true, required: true })
  name: string;

  @prop({
    type: Types.ObjectId,
    ref: () => User,
    required: true,
  })
  owner: Ref<User>;

  @prop({
    type: Date,
    required: true,
    default: null,
  })
  deletedAt: Date;
}

const propertyModel = getModelForClass(Property);
export default propertyModel;
