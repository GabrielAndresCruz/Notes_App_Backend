import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { Category } from "../../database/entities/category.entity";
import { PaginationInfo, Paginator } from "../middleware/paginator.middleware";
import {
  sendFailure,
  sendResponse,
  sendSuccess,
} from "../../utils/responseHandlers";
import { CreateCategoryDTO } from "../DTOs/category.dto";
import { validateOrReject } from "class-validator";
import { Note } from "../../database/entities/note.entity";
import { User } from "../../database/entities/user.entity";

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
  private categoryRepository = AppDataSource.getRepository(Category);

  // Binding the controllers functions
  constructor() {
    this.getAllCategories = this.getAllCategories.bind(this);
    this.createCategory = this.createCategory.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
  }

  // Controllers functions
  async getAllCategories(req: Request, res: Response) {
    // Use id property thanks to authenticationJwt middleware
    const userId = req.user?.id;

    // Create a query builder for 'Category' entity
    const queryBuilder = this.categoryRepository
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

  async createCategory(req: Request, res: Response) {
    // Get the id by req.user
    const userId = req.user?.id;
    // Get the category info by req.body
    const categoryData = req.body;

    // Populate the DTO schema with the required information
    const categoryDTO = new CreateCategoryDTO();
    Object.assign(categoryDTO, categoryData);

    // Validate errors using DTO
    await validateOrReject(categoryDTO);

    // Create new category
    const newCategory = this.categoryRepository.create({
      name: categoryData.name,
    });
    // Verify if the new category has notes.
    if (categoryData.notes && categoryData.notes.length > 0) {
      // Get the categories by their IDs
      const noteIds = categoryData.notes;
      const notes = await AppDataSource.getRepository(Note).findBy({
        id: noteIds,
      });

      // Establish relationship with categories and actualize the note
      newCategory.notes = notes;
    } else {
      newCategory.notes = [];
    }

    // Get the user
    const user: User = await AppDataSource.getRepository(User).findOneByOrFail({
      id: userId,
    });

    // Establish category - user relation
    newCategory.user = user;
    await this.categoryRepository.save(newCategory);

    sendResponse(res, 200, newCategory, "Category created successfully");
  }

  async updateCategory(req: Request, res: Response) {
    const id = req.user?.id;
    const categoryData = req.body;

    // Make sure we have body info
    if (!categoryData.name) {
      sendFailure(res, 404, "Must submit a new name for the category");
    }
    // Retrieve the existing category from the database
    const category = await this.categoryRepository.find({
      where: { id: Number(id) },
      relations: ["notes"],
    });

    // Ensure that the category to be edited exists
    // Not use findOneOrFail property, because we want to manage the error message in case the note doesn't exist.
    if (!category || category.length === 0) {
      sendFailure(res, 404, "Category doesn't exists");
    }

    // Update the note with DTO's data
    this.categoryRepository.merge(category[0], {
      name: categoryData.name,
    });

    // Save the updated category in database
    const updateCategory = await this.categoryRepository.save(category);

    sendResponse(res, 200, updateCategory, "Category updated successfully");
  }
}
