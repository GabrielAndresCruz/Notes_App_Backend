import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { Category } from "../../database/entities/category.entity";
import { PaginationInfo, Paginator } from "../middleware/paginator.middleware";
import { sendResponse } from "../../utils/responseHandlers";

export class CategoryController {
  /* When you use private variables to encapsulate the logic, you must take two different ways:
    1- Use bind inside the controller Class:
        constructor () {
            this.getFunction = this.getFunction.bind(this)
        }
       Or, use bind outside the controller Class, in note.route.ts file:
        router.get("/note", noteController.getFunction.bind(getFunction))
    2- Note arrow function to getFunctions. Arrow function can't use like constructors, and don't have .prototype property.
  */

  // Private class constant to avoid repetition every time it's needed in different functions.
  private categoryRepositorty = AppDataSource.getRepository(Category);

  // Binding the controllers functions
  constructor() {
    this.getAllCategories = this.getAllCategories.bind(this);
  }

  // Controllers functions
  async getAllCategories(req: Request, res: Response) {
    // Use id property thanks to authenticationJwt middleware
    const userId = req.user?.id;

    // Create a query builder for 'Category' entity
    const queryBuilder = this.categoryRepositorty
      .createQueryBuilder("category")
      .leftJoinAndSelect("category.user", "user") // leftJoinAndSelect(relation: string, alias: string): this is like relations: ["user"]
      .where("user.id = :userId", { userId });

    // Use pagination for show data
    const paginationPromise = Paginator.paginate(queryBuilder, req) as Promise<{
      records: Category[];
      paginationInfo: PaginationInfo;
    }>;

    // Destructuring the promise of pagination for get the categoriees list and the pagination info
    const { records: categories, paginationInfo } = await paginationPromise;
    sendResponse(res, 200, categories, "Categories list");
  }
}
