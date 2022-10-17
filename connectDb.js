const mongoose = require("mongoose");

console.log("Connecting...");
module.exports = async () => {
  const url = `${process.env.MONGODB_CONNECTION}/${process.env.MONGODB_DATABASE}`;
  return await mongoose
    .connect(url, () => console.log("Connected"))
    .catch((e) => {
      console.log("Could not connect to mongo db ", e);
    })
    .then(() => console.log("Cnnected.."));
};
