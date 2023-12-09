import { Rating } from "@smastrom/react-rating";
import { handleTime, statusDays } from "../utils";

export const Comment = ({ name, value, children, date, image }) => {
  const days = handleTime(date);

  return (
    <div className="w-full flex items-center py-4 px-6 gap-8">
      <figure className="flex item justify-center ">
        <img
          src={image || "/food-landing.png"}
          alt="avatar"
          width={"70px"}
          className="rounded-full min-w-[60px]"
        />
      </figure>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="md:text-lg text-sm font-semibold ml-1">{name}</h1>
          <p className="md:text-sm text-xs opacity-70">
            | <span className="ml-1">{statusDays(days)}</span>
          </p>
        </div>
        <Rating style={{ maxWidth: 100 }} value={value} readOnly />
        <p className="ml-1 md:text-base text-sm">{children}</p>
      </div>
    </div>
  );
};
