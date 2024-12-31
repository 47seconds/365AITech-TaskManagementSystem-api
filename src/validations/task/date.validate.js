import { ApiError } from "../../utils/ApiError.util.js";

export const dateValidation = (date) => {
  const today = new Date();
  if (!date) return today;
  if (date < today) throw new ApiError(400, "date should be in future only");
};
