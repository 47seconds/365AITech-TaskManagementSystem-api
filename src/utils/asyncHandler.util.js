import { ApiError } from "./ApiError.util.js";
import { ApiResponse } from "./ApiResponse.util.js";

// Have ability to handle ApiResponses if thrown, lets see if we can use it later if scenerio arises
const asyncHandler = (reqHandler) => {
  return (req, res, next) => {
    Promise.resolve(reqHandler(req, res, next)).catch((error) => {
      if (error instanceof ApiError) {
        return res.status(error.statusCode || 500).json({
          success: error.success,
          statusCode: error.statusCode,
          errors: error.errors,
          stack: error.stack?.trim(),
          message: error.message,
        });
      } else if (error instanceof ApiResponse) {
        return res.status(error.statusCode || 200).json({
          success: error.success,
          statusCode: error.statusCode,
          user: error.user,
          data: error.data,
          message: error.message,
        });
      } else {
        const otherError = new ApiError(
          500,
          error.message,
          error.name,
          error.stack
        );
        return res.status(otherError.statusCode).json({
          success: otherError.success,
          statusCode: otherError.statusCode,
          error: otherError.name,
          stack: otherError.stack.trim(),
          message: otherError.message,
        });
      }
    });
  };
};

export { asyncHandler };
