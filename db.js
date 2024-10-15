const mongoose = require('mongoose');
const { MONGO_URI, DATABASE_NAME } = process.env;


const connectDB = async () => {
  try {
    console.log(MONGO_URI, DATABASE_NAME)
    await mongoose.connect(MONGO_URI, {
      dbName: DATABASE_NAME
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;

