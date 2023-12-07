export const Card = ({
  image = "/food-landing.png",
  title = "Card Title",
  category = "Indonesia",
}) => {
  return (
    <div className="flex flex-col items-center w-[14rem] px-4 py-6 bg-slate-50 border-2 border-slate-100 gap-6 rounded-lg shadow-md">
      <figure className="flex justify-center items-center">
        <img
          src={image}
          alt="card-image"
          className="rounded-md"
          width={"120px"}
        />
      </figure>
      <div className="flex flex-col justify-center items-center gap-1">
        <h1 className="text-lg font-bold">{title}</h1>
        <span className="text-xs opacity-60 font-semibold">{category}</span>
      </div>
    </div>
  );
};
