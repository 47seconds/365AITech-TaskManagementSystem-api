import { Router } from "express";
import {
  getUserTasks,
  addUserTask,
  getSpecificTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

export const taskRouter = Router();

taskRouter.route("/").get(verifyJWT, getUserTasks);
taskRouter.route("/").post(verifyJWT, addUserTask);
taskRouter.route("/:task_id").get(verifyJWT, getSpecificTask);
taskRouter.route("/:task_id").put(verifyJWT, updateTask);
taskRouter.route("/:task_id").delete(verifyJWT, deleteTask);
