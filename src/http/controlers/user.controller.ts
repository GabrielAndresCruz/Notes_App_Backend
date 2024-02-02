import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { User } from "../../database/entities/user.entity";
import {
  sendError,
  sendFailure,
  sendResponse,
  sendSuccess,
} from "../../utils/responseHandlers";
import { LoginUserDTO, RegisterUserDTO, UpdateUserDTO } from "../DTOs/user.dto";
import { validateOrReject } from "class-validator";
import { sign } from "jsonwebtoken";
import { PaginationInfo, Paginator } from "../middleware/paginator.middleware";

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
    this.logoutUser = this.logoutUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  // Controllers functions
  async getAllUsers(req: Request, res: Response) {
    // Use id property thanks to authenticationJwt middleware, for get all notes of one user.
    const userId = req.user?.id;

    // Create a query builder for 'User' entity.
    const queryBuilder = this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.notes", "notes") // leftJoinAndSelect(relation: string, alias: string): this is like relations: ["user"]
      .leftJoinAndSelect("user.categories", "categories")
      .where("user.id = :userId", { userId });

    // User pagination for show data
    const paginationPromise = Paginator.paginate(queryBuilder, req) as Promise<{
      records: User[];
      paginationInfo: PaginationInfo;
    }>;

    // Destructuring the promise of pagination for get the notes list and the pagination info
    const { records: notes, paginationInfo } = await paginationPromise;
    sendResponse(res, 200, notes, "User list", paginationInfo);
  }

  async getOneUser(req: Request, res: Response) {
    const { id } = req.params;
    const user: User = await this.userRepository.findOneByOrFail({
      id: Number(id),
    });
    sendResponse(res, 200, user, `${user.username} information`, null);
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
    sendResponse(res, 200, newUser, "User created successfully", null);
  }

  async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    // Populate the DTO schema with the required information
    const userDTO = new LoginUserDTO();

    Object.assign(userDTO, req.body);
    // Validate errors using DTO
    await validateOrReject(userDTO);

    // Verify the existence of the user
    const user = await this.userRepository.findOneByOrFail({ email: email });

    // Both validateOrReject and findOneByOrFail work in a similar way – if the conditions aren't met, they throw an error and halt the compilation.

    // Token generator
    let accessToken = sign(
      {
        id: user.id,
        /* This is what the token info have in his content. If you use email here, the token 
          would travel throw the app with email property. */
      },
      "access_secret", // Secret or private Key, should be in .env file.
      {
        expiresIn: 60 * 60,
      }
    );

    // Adding token to req.headers.cookie
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // equivalent to 1 day
      // Use the next property in production to protect token.
      // sameSite: "strict", // Restrict cookie to same site
    });

    // SendSuccess and SendResponse are the same, but the first one don't have data object info.
    sendSuccess(res, 200, "Login successfully");
  }

  async logoutUser(req: Request, res: Response) {
    // Take token of header
    const tokenString = req.headers.cookie;

    // With this logic, we manage to separate the key from the value since it comes as a single string
    const equalsIndex: any = tokenString?.indexOf("=");
    const tokenValue = tokenString?.slice(equalsIndex + 1);

    // Validate existing token
    if (!tokenValue) {
      return sendFailure(res, 404, "No account logged");
    }

    // Reset cookie to clear the token
    res.cookie("access_token", "", { maxAge: 0 });

    sendSuccess(res, 200, "Successfully sign out");
  }

  async updateUser(req: Request, res: Response) {
    // Use id property thanks to authenticationJwt middleware
    const id = req.user?.id;
    const userData = req.body;

    // Populate the DTO schema with the required information
    const userDTO = new UpdateUserDTO();
    Object.assign(userDTO, userData);

    // Validate errors using DTO
    await validateOrReject(userDTO);

    const existingUser = await this.userRepository.findOneByOrFail({
      id: Number(id),
    });

    /* Both functions (validateOrReject and findOneByOrFail) work in a similar way – if the conditions 
    aren't met, they throw an error and stop the compilation. */

    // Update the user with the body data
    this.userRepository.merge(existingUser, userData);

    // Save the updated user in the database
    const updateUser = await this.userRepository.save(existingUser);

    sendResponse(res, 200, updateUser, "User updated successfully", null);
  }

  async deleteUser(req: Request, res: Response) {
    // Use id property thanks to authenticationJwt middleware
    const id = req.user?.id;

    // Find the user with the specified 'id'
    const user = await this.userRepository.findOneByOrFail({ id: Number(id) });

    // Remove the found user from the database
    this.userRepository.remove(user);

    sendSuccess(res, 200, "User deleted successfully");
  }
}

export default UserController;
