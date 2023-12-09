const mongoose = require("mongoose");
const User = require("../models/user-model");
const bcrypt = require("bcrypt");

// Get the MONGO_URI from the environment variables
const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI)
    .then(async () => {
      // If connection is successful then log a message
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      // If connection fails then log a message and exit the process
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};
