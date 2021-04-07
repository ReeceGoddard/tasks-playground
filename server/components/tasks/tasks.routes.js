import express from "express";
import TaskController from "./tasks.controller";
import { authenticateToken } from "../auth/middlewares/auth.middleware";

const router = express.Router();

router.get("/", authenticateToken, TaskController.getAll);

router.post("/", authenticateToken, TaskController.create);

router.patch("/:id", authenticateToken, TaskController.patch);

router.delete("/:id", authenticateToken, TaskController.delete);

export { router as tasksRouter };
