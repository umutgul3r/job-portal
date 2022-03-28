const Mongoose = require("mongoose");

const db = Mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB");
});

const ConnectDb = async () => {
  await Mongoose.connect(process.env.DB_CONFIG, {
    useNewUrlParser: true,
  });
};

module.exports = { ConnectDb };
