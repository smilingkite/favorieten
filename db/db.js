const mongoose = require("mongoose");
const db = mongoose
  .connect("mongodb://localhost:27017/favorieten")
  .then(() => {
    console.log(`connected to mongodb successfully`);
  })
  .catch((err) => console.error(err));

module.exports = db;
