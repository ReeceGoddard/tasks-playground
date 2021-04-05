import express from "express";
import UserController from "./users.controller";

const router = express.Router();

router.get("/", UserController.getAll);

router.post("/", UserController.create);

router.delete("/:id", UserController.delete);

export { router as usersRouter };
