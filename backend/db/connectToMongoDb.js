import mongoose from 'mongoose';

const connectToMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`Mongos Db is Connected ${process.env.MONGO_DB_URI}`);
  } catch (err) {
    console.log(err.message);
  }
};
export default connectToMongoDb;
