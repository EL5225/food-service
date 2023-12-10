import { FaTrashAlt } from "react-icons/fa";

export const CardImage = ({
  image,
  width = "w-full",
  onClick,
  name,
  size,
  onDelete,
}) => {
  const sizeinKB = size / 1000;

  const fixSize = sizeinKB.toFixed(0);

  return (
    <div
      className={`${width} h-auto relative flex py-2 px-6 items-center justify-between rounded-md border border-black shadow-md hover:scale-105 duration-200`}>
      <button onClick={onClick} className="w-[80%] flex items-center gap-4">
        <img
          src={image}
          alt="card"
          className="max-w-[60px] max-h-[50px] object-cover rounded-md"
        />
        <div className="flex flex-col gap-2 justify-center ">
          <p className="font-semibold text-xs text-left">{name}</p>
          <p className="font-semibold text-xs text-left">{fixSize} KB</p>
        </div>
      </button>

      <button className="p-2" onClick={onDelete}>
        <FaTrashAlt className="text-xl text-red-700" />
      </button>
    </div>
  );
};
