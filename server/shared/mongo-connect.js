import { config } from "dotenv";
config();
import debugLib from "debug";
import mongoose from "mongoose";
const debug = debugLib("dev");

const connectToMongo = () => {
  const { DB_USER, DB_PASS, DB_URI, DB_PORT, DB_NAME } = process.env;
  const dev_db_url = `mongodb://${DB_USER}:${DB_PASS}@${DB_URI}:${DB_PORT}/${DB_NAME}?authSource=admin`;
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  mongoose
    .connect(dev_db_url, options)
    .then(() => {
      debug(`Connected to the ${DB_NAME} database`);
    })
    .catch((err) => {
      debug("MongoDB connection unsuccessful");
      debug(err);
    });
};

export default connectToMongo;
