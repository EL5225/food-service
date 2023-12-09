export const handleDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const handleTime = (date) => {
  const today = new Date();
  const targetDate = new Date(date);

  const differenceInTime = today.getTime() - targetDate.getTime();

  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  return Math.floor(differenceInDays);
};

export const statusDays = (day) => {
  if (day >= 365) {
    return `${Math.floor(day / 365)} tahun yang lalu`;
  } else if (day >= 30) {
    return `${Math.floor(day / 30)} bulan yang lalu`;
  } else if (day >= 7) {
    return `${Math.floor(day / 7)} minggu yang lalu`;
  } else if (day >= 1) {
    return `${day} hari yang lalu`;
  } else if (day === 0) {
    return "Hari ini";
  }
};
