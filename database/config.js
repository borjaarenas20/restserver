const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.MONGODB_CNN);

    console.log("BD Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error al iniciar base de datos");
  }
};

module.exports = {
  dbConnection,
};
