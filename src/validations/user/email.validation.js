import { ApiError } from "../../utils/ApiError.util.js";
import domains from "../../resources/domains.resource.json" with { type: "json" };

export const emailValidation = (email) => {
  // extract domain from email provided
  const domain = email.split("@");

  // if email have no domain, throw invalid email error
  if (domain[1] === "")
    throw new ApiError(400, "please provide email correctly");
  // else, check if valid domain is provided from resource file
  else if (!domains.includes(domain[1]))
    throw new ApiError(400, "please provide a valid email");
};
