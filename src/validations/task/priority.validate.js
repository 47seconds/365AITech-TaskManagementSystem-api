import priorityAvailable from "../../resources/priority.resource.json" with { type: "json" };

export const priorityValidation = (priority) => {
  if (priorityAvailable.includes(priority.trim())) return priority.trim();
  return "medium";
};
