import express from "express";
import errorHandler from "../http/middleware/errorHandler.middleware";
import { CategoryController } from "../http/controlers/category.controller";

const router = express.Router();

const categoryController = new CategoryController();

router.get("/", errorHandler(categoryController.getAllCategories));

export default router;
