import { Link } from "react-router-dom";
import { Spinner } from "./loadings";

export const Button = ({
  children,
  onClick,
  isLoading,
  backgroundColor = "bg-black hover:bg-zinc-800",
  textColor = "text-white",
  width = "w-full",
  href,
  type,
  disabled,
}) => {
  return href ? (
    <Link className="w-full" to={href}>
      <button
        className={`flex ${width} items-center justify-center px-4 md:py-3 py-2 rounded-md md:text-lg text-base 
      mt-2 font-semibold ${backgroundColor} ${textColor}`}>
        {isLoading ? <Spinner width="w-5" height="h-5" /> : children}
      </button>
    </Link>
  ) : (
    <button
      type={type}
      disabled={disabled}
      className={`flex ${width} items-center justify-center px-4 md:py-3 py-2 rounded-md md:text-lg text-base 
    mt-2 font-semibold ${backgroundColor} ${textColor} disabled:bg-gray-400 disabled:text-gray-300 disabled:cursor-not-allowed`}
      onClick={onClick}>
      {isLoading ? <Spinner width="w-7" height="h-7" /> : children}
    </button>
  );
};
