import statusAvailable from "../../resources/status.resource.json" with { type: "json" };

export const statusValidation = (status) => {
  // if status provided in resource file, return that, else return default one
  if (statusAvailable.includes(status.trim())) return status.trim();
  return "pending";
};
