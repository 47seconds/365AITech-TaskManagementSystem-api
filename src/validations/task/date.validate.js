import { ApiError } from "../../utils/ApiError.util.js";

export const dateValidation = (date) => {
  // if no date is given, we return current day
  const today = new Date();
  if (!date) return today;

  // else, date provided should be in future
  if (date < today) throw new ApiError(400, "date should be in future only");
};
