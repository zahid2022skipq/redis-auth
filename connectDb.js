const mongoose = require("mongoose");

console.log("Connecting...");
module.exports = () => {
  const url = `${process.env.MONGODB_CONNECTION}/${process.env.MONGODB_DATABASE}`;
  return mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
      console.log("Connected to MongoDB");
    })
    .catch((e) => {
      console.log("Could not connect to mongo db ", e);
    });
};
