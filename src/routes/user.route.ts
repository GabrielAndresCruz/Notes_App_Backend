import express from "express";
import UserController from "../http/controlers/user.controller";
import errorHandler from "../http/middleware/errorHandler.middleware";

const router = express.Router();

const userController = new UserController();

// The errorHandler middleware catches errors without cluttering the controller logic with try-catch blocks.
router.get("/", errorHandler(userController.getAllUsers));

router.get("/:id", errorHandler(userController.getOneUser));

router.post("/register", errorHandler(userController.registerUser));

router.post("/login", errorHandler(userController.loginUser));

export default router;
