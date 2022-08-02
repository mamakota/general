export const getRandomNumber = (сharacters) => {
  const number = Math.round(Math.random() * Math.pow(10, сharacters));
  return number;
};
