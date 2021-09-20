export const calculateOneYearAgo = () => {
  const today = new Date();

  const date = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear() - 1;

  return `${year}-${month < 10 ? "0" : ""}${month}-${
    date < 10 ? "0" : ""
  }${date}..`;
};
