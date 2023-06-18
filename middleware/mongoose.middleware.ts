import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB environment variable inside .env.local');
}

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    // if it is not ready yet return
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      //****** since  mongoose 6, we dont need those******
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
      //   useFindAndModify: false,
      //   useCreateIndex: true,
    });
    console.log('connected to db');
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;