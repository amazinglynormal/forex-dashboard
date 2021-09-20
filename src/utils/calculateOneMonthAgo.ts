export const calculateOneMonthAgo = () => {
  const today = new Date();

  let date = today.getDate();
  let month = today.getMonth();
  const year = today.getFullYear();

  if (date === 31) {
    switch (month) {
      case 4:
      case 6:
      case 9:
      case 11:
        date = 30;
        break;

      case 2:
        date = 28;
        break;
    }
  }

  if (month === 0) {
    month = 12;
  }
  return `${year}-${month < 10 ? "0" : ""}${month}-${
    date < 10 ? "0" : ""
  }${date}..`;
};
