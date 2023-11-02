const mongoose = require("mongoose");

const ConnectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/moviesDB")
    .then(() => console.log("connected to moviesDB"))
    .catch((error) => console.log("error: " + error));
};

module.exports = ConnectDB;
