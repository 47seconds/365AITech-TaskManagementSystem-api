import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { Category } from "../models/category.model.js";

export const getUserCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ user: req.user._id });
  if (!categories) throw new ApiError(404, "no categories found for this user");
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        categories,
        req.user,
        "user categories successfully fetched"
      )
    );
});

export const addUserCategory = asyncHandler(async (req, res) => {
  const {name} = req.body;
  if (!name) throw new ApiError(400, "category name not parsed");
  const category = Category.create(
    {
      user: req.user._id,
      name: name
    }
  );

  if (!category) throw new ApiError(500, "unable to add given category in database");
  return res
  .status(200)
  .json(
      new ApiResponse(200, category._doc, req.user, "successfully added category in database")
    );
});
