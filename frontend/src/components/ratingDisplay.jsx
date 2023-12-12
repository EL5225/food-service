import { Rating } from "@smastrom/react-rating";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import {
  MdOutlineDoubleArrow,
  MdOutlineKeyboardDoubleArrowDown,
} from "react-icons/md";

export const RatingDisplay = ({ rating, average }) => {
  return (
    <div className="w-full flex lg:flex-row flex-col border justify-center items-center lg:gap-14 gap-8 py-8 rounded-md shadow-md ">
      <div className="flex flex-col lg:w-[30%] px-5 py-4 shadow-md border rounded-md gap-2">
        <h1 className="text-xl font-bold ml-1">Rating</h1>
        <div className="flex flex-col text-xl font-semibold gap-2">
          <h2 className="ml-1">
            {average} / <span className="opacity-40">5</span>
          </h2>
          <Rating style={{ maxWidth: 150 }} readOnly value={average} />
        </div>
      </div>
      <MdOutlineDoubleArrow className="ml-8 text-5xl text-slate-400 lg:block hidden" />
      <MdOutlineKeyboardDoubleArrowDown className="text-5xl text-slate-400 lg:hidden block animate-bounce" />
      <div className="lg:w-[40%] flex flex-col items-center gap-2 p-4 rounded-sm ">
        {rating?.map((rating, i) => (
          <div key={i} className="flex items-center gap-12">
            <Rating style={{ maxWidth: 120 }} readOnly value={rating.star} />
            <CgArrowsExchangeAlt className="text-2xl" />
            <span className="text-base text-center font-semibold w-8">
              {rating.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
