import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { User } from "../../database/entities/user.entity";
import {
  sendError,
  sendResponse,
  sendSuccess,
} from "../../utils/responseHandlers";
import { LoginUserDTO, RegisterUserDTO } from "../DTOs/user.dto";
import { validateOrReject } from "class-validator";
import { sign } from "jsonwebtoken";

export class UserController {
  /* When you use private variables to encapsulate the logic, you must take two different ways:
    1- Use bind inside the controller Class:
        constructor () {
            this.getFunction = this.getFunction.bind(this)
        }
       Or, use bind outside the controller Class, in user.route.ts file:
        router.get("/user", userController.getFunction.bind(getFunction))
    2- User arrow function to getFunctions. Arrow function can't use like constructors, and don't have .prototype property.
  */

  // Private class constant to avoid repetition every time it's needed in different functions.
  private userRepository = AppDataSource.getRepository(User);

  // Binding the controllers functions
  constructor() {
    this.getAllUsers = this.getAllUsers.bind(this);
    this.getOneUser = this.getOneUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  // Controllers functions
  async getAllUsers(req: Request, res: Response) {
    const users: Array<User> = await this.userRepository.find();
    sendResponse(res, 200, users, "User list");
  }

  async getOneUser(req: Request, res: Response) {
    const { id } = req.params;
    const user: User = await this.userRepository.findOneByOrFail({
      id: Number(id),
    });
    sendResponse(res, 200, user, `${user.username} information`);
  }

  async registerUser(req: Request, res: Response) {
    const userData = req.body;

    // We populate the DTO schema with the required information.
    const userDTO = new RegisterUserDTO();
    Object.assign(userDTO, userData);

    // Validate errors using DTO
    await validateOrReject(userDTO);
    // If something goes wrong, the validateOrReject function will just throw an error,
    // and the rest of the code won't even bother compiling.

    // Create and Save new User
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);

    sendResponse(
      res,
      200,
      newUser,
      `${newUser[0].username} created successfully`
    );
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    // Populate the DTO schema with the required information
    const userDTO = new LoginUserDTO();
    Object.assign(userDTO, req.body);

    // Validate errors using DTO
    await validateOrReject(userDTO);

    // Verify the existence of the user
    await this.userRepository.findOneByOrFail({ email: email });

    // Both validateOrReject and findOneByOrFail work in a similar way – if the conditions aren't met, they throw an error and halt the compilation.

    // Token generator
    let accessToken = sign({ email: email }, "access_secret", {
      expiresIn: 60 * 60,
    });

    // Adding token to req.headers.cookie
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // equivalent to 1 day
    });

    // SendSuccess and SendResponse are the same, but the first one don't have data object info.
    sendSuccess(res, 200, "Login successfully");
  }
}

export default UserController;
