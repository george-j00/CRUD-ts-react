const mongoose = require('mongoose');
require('dotenv').config();
// Connect to MongoDB
async function connectToMongoDB() {
    try {
      mongoose.connect(process.env.MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (error) {``
      console.error('Error connecting to MongoDB:', error);
    }
  }
  
  module.exports = {
    connectToMongoDB,  
  };  
  
  
