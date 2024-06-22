const mongoose = require("mongoose");
/*const config = require("config");
const db = config.get("mongoURI");*/
require("dotenv").config();

const connectDB = mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

module.exports = connectDB;
