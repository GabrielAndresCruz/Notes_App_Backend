import express from "express";
import UserController from "../http/controlers/user.controller";

const userController = new UserController();

const router = express.Router();

router.get("/", userController.getAllUsers);

export default router;
