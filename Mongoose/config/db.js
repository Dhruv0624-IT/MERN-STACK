const mongoose = require("mongoose");

const dbconfig = () => {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("DB connection error: ", err));
};

module.exports = dbconfig;
