import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { User } from "../../database/entities/user.entity";
import { sendError, sendResponse } from "../../utils/responseHandlers";

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
  private userRepository = AppDataSource.getRepository(User);

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
}

export default UserController;
