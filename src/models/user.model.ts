import {
  getModelForClass,
  index,
  modelOptions,
  pre,
  prop,
} from '@typegoose/typegoose';
import bcrypt from 'bcrypt';

@index({ name: 1 })
@pre<User>('save', async function () {
  if (!this.isModified('password')) return;

  this.password = await bcrypt.hash(this.password, 12);
})
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @prop({ type: String, unique: true, required: true })
  name: string;

  @prop({
    type: String,
    required: true,
    minlength: 8,
    maxLength: 32,
    select: false,
  })
  password: string;

  @prop({ type: String, unique: true, required: true })
  phone: string;

  @prop({ type: String, required: true })
  type: string;

  @prop({ type: String, required: true })
  role: string;

  async comparePasswords(hashedPassword: string, candidatePassword: string) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

const userModel = getModelForClass(User);
export default userModel;
