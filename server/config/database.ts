import mongoose from 'mongoose';
import dotenv from 'dotenv';

async function connectToMongoDB() {
    try {
      mongoose.connect(process.env.MONGODB_URI as string);
      console.log('Connected to MongoDB');
    } catch (error) {``
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
 export default { connectToMongoDB };
  
  
