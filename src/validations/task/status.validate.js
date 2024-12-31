import statusAvailable from "../../resources/status.resource.json" with { type: "json" };

export const statusValidation = (status) => {
  if (statusAvailable.includes(status.trim())) return status.trim();
  return "pending";
};
