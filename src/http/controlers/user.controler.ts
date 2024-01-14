import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { User } from "../../database/entities/user.entity";

export class UserController {
  /* When you use private variables to encapsulate the logic, you must take two different ways:
    1- Use bind inside the controller Class:
        constructor () {
            this.getFunction = this.getFunction.bind(this)
        }
       Or, use bind outside the controller Class, in user.route.ts file:
        router.get("/user", userController.getFunction.bind(getFunction))
    2- User arrow function to getFunctions (I'm on this way). Arrow function can't use like constructors, and don't have .prototype property.
  */

  private userRepository = AppDataSource.getRepository(User);

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userRepository.find();
      res.status(200).send(users);
    } catch (error) {
      res.status(400).send({
        message: error,
      });
    }
  }
}
