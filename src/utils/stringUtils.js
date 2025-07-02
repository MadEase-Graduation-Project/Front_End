export const readTime = (string) => {
  const words = string.split(" ");
  const minutes = Math.ceil(words.length / 225);
  return minutes;
};

export const description = (string) => {
  const words = string.split(" ");
  const description = words.slice(0, 3).join(" ") + " . . . . . ";
  return description;
};

export const handelNameRoute = (name) => {
  // Handle empty or null names
  if (!name || typeof name !== "string") {
    return "";
  }

  const nameArr = name
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  if (nameArr.length === 0) {
    return "";
  } else if (nameArr.length === 1) {
    // One word: return as is
    return nameArr[0];
  } else if (nameArr.length === 2) {
    return `${nameArr[0]}-${nameArr[1]}`;
  } else {
    return nameArr.join("-");
  }
};
