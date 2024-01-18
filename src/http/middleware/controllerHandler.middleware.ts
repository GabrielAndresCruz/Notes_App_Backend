import UserController from "../controlers/user.controller";
import errorHandler from "./errorHandler.middleware";

// Use entities controllers.
const userController = new UserController();

// Binding and Handling errors
const users = {
  getAllUsers: errorHandler(userController.getAllUsers.bind(userController)),
};

// Export bound and catched functions, like a normal controller function
export default users;
