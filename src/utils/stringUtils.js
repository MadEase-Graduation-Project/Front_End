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
