import { Router } from "express";
import {
  getUserCategories,
  getSpecificCategory,
  addUserCategory,
  deleteUserCategory,
} from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

export const categoryRouter = Router();

categoryRouter.route("/").get(verifyJWT, getUserCategories);
categoryRouter.route("/:category_id").get(verifyJWT, getSpecificCategory);
categoryRouter.route("/").post(verifyJWT, addUserCategory);
categoryRouter.route("/:category_id").delete(verifyJWT, deleteUserCategory);
