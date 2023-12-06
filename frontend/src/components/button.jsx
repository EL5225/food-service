import { Spinner } from "./spinner";

export const Button = ({ children, onClick, isLoading }) => {
  return (
    <button
      className="flex w-full items-center justify-center px-4 md:py-3 py-2 rounded-md bg-black hover:bg-zinc-800 md:text-lg text-base text-white 
      mt-2 font-semibold"
      onClick={onClick}>
      {isLoading ? <Spinner width="w-5" height="h-5" /> : children}
    </button>
  );
};
