import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { Task } from "../models/task.model.js";
import { Category } from "../models/category.model.js";
import {
  statusValidation,
  priorityValidation,
  dateValidation,
} from "../validations/task/index.js";

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

export const addUserTask = asyncHandler(async (req, res) => {
  const { title, description, status, priority, dueDate, category_id } =
    req.body;
  if (!(title && description && category_id))
    throw new ApiError(
      400,
      "title, description, and category_id are mandatory feilds"
    );

  const category = await Category.findById(category_id);
  if (!category) throw new ApiError(404, "invalid category id parsed");

  const validStatus = statusValidation(status);
  const validPriority = priorityValidation(priority);
  let validDueDate = new Date();
  if (dueDate) {
    if (dueDate < validDueDate)
      throw new ApiError(400, "date parsed must be in future");
    else validDueDate = dueDate;
  }

  const createdTask = await Task.create({
    user: req.user._id,
    title: title,
    description: description,
    status: validStatus,
    priority: validPriority,
    dueDate: validDueDate,
    category: category,
  });

  if (!createdTask) throw new ApiError(500, "failed to add task");
  return res
    .status(200)
    .json(
      new ApiResponse(200, createdTask, req.user, "task created successfully")
    );
});

export const getSpecificTask = asyncHandler(async (req, res) => {
  const { task_id } = req.params;

  const task = await Task.findById(task_id);
  if (!task) throw new ApiError(404, "no such task found");

  return res
    .status(200)
    .json(
      new ApiResponse(200, task._doc, req.user, "task fetched successfully")
    );
});

export const updateTask = asyncHandler(async (req, res) => {
  const { task_id } = req.params;
  const isTaskExist = await Task.findById(task_id);
  if (!isTaskExist) throw new ApiError(404, "no such task exist");

  const { title, description, status, priority, dueDate, category_id } =
    req.body;
  if (!(title || description || status || priority || dueDate || category_id))
    throw new ApiError(400, "no field for task edit is parsed");

  const modifiedTitle = title ? title : isTaskExist.title;
  const modifiedDescription = description
    ? description
    : isTaskExist._doc.description;
  const modifiedStatus = status ? status : isTaskExist.status;
  const modifiedPriority = priority
    ? priorityValidation(priority)
    : isTaskExist.priority;
  const modifiedDueDate = dueDate
    ? dateValidation(dueDate)
    : isTaskExist.dueDate;
  let modifiedCategory_id = category_id ? category_id : null;

  let modifiedCategory;
  if (modifiedCategory_id) {
    modifiedCategory = await Category.findById(modifiedCategory_id);
    if (!modifiedCategory) throw new ApiError(404, "no such category exist");
  } else modifiedCategory = isTaskExist.category;

  const updatedTask = await Task.findByIdAndUpdate(
    task_id,
    {
      title: modifiedTitle,
      description: modifiedDescription,
      status: modifiedStatus,
      priority: modifiedPriority,
      dueDate: modifiedDueDate,
      category: modifiedCategory,
    },
    { new: true }
  );

  if (!updatedTask) throw new ApiError(500, "failed to update task");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedTask._doc,
        req.user,
        "task updated successfully"
      )
    );
});

export const deleteTask = asyncHandler(async (req, res) => {
  const { task_id } = req.params;

  const task = await Task.findByIdAndDelete(task_id);
  if (!task) throw new ApiError(404, "no such task exist");

  return res
    .status(200)
    .json(new ApiResponse(200, {}, req.user, "task deleted successfully"));
});
