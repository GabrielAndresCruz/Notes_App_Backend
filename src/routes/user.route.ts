import express from "express";
import UserController from "../http/controlers/user.controller";
import errorHandler from "../http/middleware/errorHandler.middleware";
import { authenticateJwt } from "../http/middleware/authenticateJwt.middleware";

const router = express.Router();

const userController = new UserController();

// The errorHandler middleware catches errors without cluttering the controller logic with try-catch blocks.
router.post("/register", errorHandler(userController.registerUser));

router.post("/login", errorHandler(userController.loginUser));

router.get("/logout", errorHandler(userController.logoutUser)); // The order of the routes is very important!

router.get("/", errorHandler(userController.getAllUsers)); // If you put this route above logout, you will not be able to occupy logout

router.get("/:id", errorHandler(userController.getOneUser));

// authenticateJwt middleware give a user information to controller, thanks to the token.
router.put("/update", authenticateJwt, errorHandler(userController.updateUser));

router.delete(
  "/delete",
  authenticateJwt,
  errorHandler(userController.deleteUser)
);

export default router;
