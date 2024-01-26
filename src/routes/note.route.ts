import express from "express";
import { NoteController } from "../http/controlers/note.controller";
import errorHandler from "../http/middleware/errorHandler.middleware";

const router = express.Router();

const noteController = new NoteController();

// The errorHandler middleware catches errors without cluttering the controller logic with try-catch blocks.
router.get("/", errorHandler(noteController.getAllNotes));

router.get("/:id", errorHandler(noteController.getOneNote));

router.post("/", errorHandler(noteController.createNote));

export default router;
