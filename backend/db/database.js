const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then((con) => console.log(`MongoDB Database connected with HOST: ${con.connection.host}`))
  .catch((err) => console.error(err));