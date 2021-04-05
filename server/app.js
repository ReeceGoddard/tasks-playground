import express from "express";
import createError from "http-errors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cors from "cors";
import logger from "morgan";
import mongoose from "mongoose";

import { tasksRouter } from "./components/tasks/tasks.routes";
import { usersRouter } from "./components/users/users.routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/tasks", tasksRouter);
app.use("/users", usersRouter);

// conntect to db
const dev_db_url = "mongodb://localhost:27017/tasks-playground";

mongoose.connect(process.env.MONGODB_URI || dev_db_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => console.log("Connected to the database"));
db.on("error", () => console.error.bind(console, "MongoDB connection error:"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

export { app };
