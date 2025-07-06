// src/utils/urlHelpers.js
export const handleNameRoute = (name) => {
  if (!name || typeof name !== "string") {
    return "";
  }

  const nameArr = name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(word => word.replace(/[^a-z0-9]/g, ''));

  return nameArr.join("-");
};
