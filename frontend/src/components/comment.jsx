import { Rating } from "@smastrom/react-rating";

export const Comment = ({ name, value, children, date }) => {
  const today = new Date();
  const targetDate = new Date(date);

  const differenceInTime = today.getTime() - targetDate.getTime();

  const differenceInDays = differenceInTime / (1000 * 3600 * 24);

  const days = Math.floor(differenceInDays);

  const statusDays = (day) => {
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

  return (
    <div className="w-full flex items-center py-4 px-6 gap-8">
      <figure>
        <img
          src="/food-landing.png"
          alt="avatar"
          width={"70px"}
          className="rounded-full"
        />
      </figure>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold ml-1">{name}</h1>
          <p className="text-sm opacity-70"> | {statusDays(days)}</p>
        </div>
        <Rating style={{ maxWidth: 100 }} value={value} readOnly />
        <p className="ml-1">{children}</p>
      </div>
    </div>
  );
};
