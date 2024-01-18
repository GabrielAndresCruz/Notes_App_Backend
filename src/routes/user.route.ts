import express from "express";
// It suppose to be a controller import, but after that, the properties pass by error handler middleware and bind function
import users from "../http/middleware/controllerHandler.middleware";

const router = express.Router();

router.get("/", users.getAllUsers);

router.get("/:id", users.getOneUser);

export default router;
