import { Router } from "express";
import { getUserTasks } from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userSession } from "../middlewares/userSession.middleware.js";

export const taskRouter = Router();

taskRouter.route("/").get(verifyJWT, getUserTasks);
