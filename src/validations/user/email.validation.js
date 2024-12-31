import { ApiError } from "../../utils/ApiError.util.js";
import domains from "../../resources/domains.resource.json" with { type: "json" };

export const emailValidation = (email) => {
  const domain = email.split("@");

  if (domain[1] === "")
    throw new ApiError(400, "please provide email correctly");
  else if (!domains.includes(domain[1]))
    throw new ApiError(400, "please provide a valid email");
};
