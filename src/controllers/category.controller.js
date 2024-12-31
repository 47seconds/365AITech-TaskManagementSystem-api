import { ApiError } from "../utils/ApiError.util.js";
import { ApiResponse } from "../utils/ApiResponse.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { Category } from "../models/category.model.js";

export const getUserCategories = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const categories = await Category.find({ user: userId });
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
