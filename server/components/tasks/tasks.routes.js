import express from "express";
import TaskController from "./tasks.controller";

const router = express.Router();

router.get("/", TaskController.getAll);

router.post("/", TaskController.create);

router.patch("/:id", TaskController.patch);

router.delete("/:id", TaskController.delete);

export { router as tasksRouter };
