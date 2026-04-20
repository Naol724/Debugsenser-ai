import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb+srv://gonfanaol39_db_user:vCVuxV1dtJTHUhTt@cluster0.p9tp0za.mongodb.net/?appName=Cluster0";
    
    if (!mongoUri) {
      console.error('MongoDB URI is not defined in environment variables');
      console.error('Please set MONGODB_URI in your environment variables');
      process.exit(1);
    }
    
    const conn = await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
