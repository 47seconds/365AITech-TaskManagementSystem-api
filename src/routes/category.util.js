import { Router } from "express";
import { getUserCategories } from "../controllers/category.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userSession } from "../middlewares/userSession.middleware.js";

export const categoryRouter = Router();

categoryRouter.route("/").get(verifyJWT, getUserCategories);
