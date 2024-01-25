import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { Note } from "../../database/entities/note.entity";
import { sendResponse } from "../../utils/responseHandlers";
import { PaginationInfo, Paginator } from "../middleware/paginator.middleware";

export class NoteController {
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
  private noteRepository = AppDataSource.getRepository(Note);

  // Binding the controllers functions
  constructor() {
    this.getAllNotes = this.getAllNotes.bind(this);
    this.getOneNote = this.getOneNote.bind(this);
  }

  // Controllers functions
  async getAllNotes(req: Request, res: Response) {
    // Use id property thanks to authenticationJwt middleware, for get all notes of one user.
    const userId = req.user?.id;

    // Create a query builder for 'Note' entity.
    const queryBuilder = this.noteRepository
      .createQueryBuilder("note")
      .leftJoinAndSelect("note.user", "user") // leftJoinAndSelect(relation: string, alias: string): this is like relations: ["user"]
      // .leftJoinAndSelect("note.categories", "categories")
      .where("user.id = :userId", { userId });

    const paginationPromise = Paginator.paginate(queryBuilder, req) as Promise<{
      records: Note[];
      paginationInfo: PaginationInfo;
    }>;
    const { records: notes, paginationInfo } = await paginationPromise;
    sendResponse(res, 200, notes, "Notes list");
  }

  async getOneNote(req: Request, res: Response) {
    const { id } = req.params;
    const note: Note = await this.noteRepository.findOneByOrFail({
      id: Number(id),
    });
    sendResponse(res, 200, note, "Note information");
  }
}
