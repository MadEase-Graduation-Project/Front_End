export const readTime = (string) => {
  const words = string.split(" ");
  const minutes = Math.ceil(words.length / 225);
  return minutes;
};
