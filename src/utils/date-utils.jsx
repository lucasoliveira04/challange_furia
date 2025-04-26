export const isDateWithinLastYear = (date) => {
  const eventDate = new Date(date);
  const today = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(today.getFullYear() - 1);

  return eventDate >= oneYearAgo;
};
