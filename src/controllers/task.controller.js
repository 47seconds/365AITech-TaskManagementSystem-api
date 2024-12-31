import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { Task } from "../models/task.model.js";

export const getUserTasks = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const tasks = await Task.find({ user: userId });
  if (!tasks) throw new ApiError(404, "no tasks found for this user");
  return res
    .status(200)
    .json(
      new ApiResponse(200, tasks, req.user, "user tasks successfully fetched")
    );
});
