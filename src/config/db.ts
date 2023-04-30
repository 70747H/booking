import mongoose from 'mongoose';
import logger from './logger';

const connectDB = async () => {
  try {
    mongoose.set('debug', true);
    await mongoose.connect(process.env.MONGODB_URI);
    logger.info('Database connected...');
  } catch (error: unknown) {
    console.log(error);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
