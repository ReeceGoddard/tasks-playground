import express from "express";
import createError from "http-errors";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import cors from "cors";
import logger from "morgan";
import { authRouter, usersRouter, tasksRouter } from "./components/routes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/tasks", tasksRouter);

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
