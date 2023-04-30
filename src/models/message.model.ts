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
export class Message {
  @prop({
    type: Types.ObjectId,
    ref: () => User,
    required: true,
  })
  sender: Ref<User>;

  @prop({
    type: Types.ObjectId,
    ref: () => User,
    required: true,
  })
  receiver: Ref<User>;

  @prop({ type: String, required: true })
  body: string;
}

const messageModel = getModelForClass(Message);
export default messageModel;
