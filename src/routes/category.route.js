import { Router } from "express";
import { getUserCategories, addUserCategory } from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

export const categoryRouter = Router();

categoryRouter.route("/").get(verifyJWT, getUserCategories);
categoryRouter.route("/").post(verifyJWT, addUserCategory);
