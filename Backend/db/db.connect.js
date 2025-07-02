const mongoose = require("mongoose");

require("dotenv").config();

const mongoUri = process.env.MONGODB;

const initializeDatabase = async () => {
  await mongoose
    .connect(mongoUri, {
      serverSelectionTimeoutMS: 3000000,
    })
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error) => console.log("Error connecting to Database", error));
};

module.exports = { initializeDatabase };
