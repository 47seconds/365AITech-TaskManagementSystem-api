import { ApiError } from "../../utils/ApiError.util.js";
import illegalChars from "../../resources/illegalChars.resource.json" with { type: "json" };

export const passwordValidation = (password) => {
  // password length should be greater than 8
  if (password.length < 8)
    throw new ApiError(
      400,
      "password length should be greater than or equal to 8 letters"
    );

  // verify if password not contain any illegal character from resource file
  for (let char of password)
    if (illegalChars.includes(char))
      throw new ApiError(400, `password contains illegal character: ${char}`);
};
