import { ApiError } from "../utils/ApiError.util.js";
import { asyncHandler } from "../utils/asyncHandler.util.js";
import { userSession } from "./userSession.middleware.js";

// Global authentication service to add user information in request and throw error upon unauthorized request
// Add user details to request as req.user
export const verifyJWT = asyncHandler(async (req, res, next) => {
  // Calling Soft-Authentication and storing details in a variable.
  const user = await userSession(req, res);
  // If user authorized, it returns user data, else return false
  if (user) {
    req.user = user;
    return next();
  }

  // if user not found, the cookies not exist, therefore unauthorized request, route to login page in frontend
  throw new ApiError(401, "unauthorized access");
});
