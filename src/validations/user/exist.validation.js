import { ApiError } from "../../utils/ApiError.util.js";
import { User } from "../../models/user.model.js";

export const existValidation = async (username, email) => {
  const existUsename = await User.findOne({ username: username.toLowerCase() });
  const existEmail = await User.findOne({ email: email.toLowerCase() });

  // We check if username is already taken or, registering email is already in use

  if (existUsename) throw new ApiError(400, "username already taken");
  if (existEmail)
    throw new ApiError("another account is registered with this email");
};
