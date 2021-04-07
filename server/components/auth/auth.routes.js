import express from "express";
import AuthController from "./auth.controller";

const router = express.Router();

router.post("/register", AuthController.registerUser);

router.post("/sign-in", AuthController.signInUser);

export { router as authRouter };
