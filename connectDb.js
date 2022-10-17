const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(process.env.MONGODB_CONNECTION).catch((e) => {
    console.log("Could not connect to mongo db ", e);
  });
};
