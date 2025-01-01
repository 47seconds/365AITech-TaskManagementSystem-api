import priorityAvailable from "../../resources/priority.resource.json" with { type: "json" };

export const priorityValidation = (priority) => {
  // if priority provided in resource file, return that, else return default one
  if (priorityAvailable.includes(priority.trim())) return priority.trim();
  return "medium";
};
