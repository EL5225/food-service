import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="relative w-full p-6 flex lg:flex-row flex-col items-center justify-between bg-[#1B4242] md:h-[15vh]">
      <figure className="relative top-4">
        <Link to={"/"} className="cursor-pointer">
          <img
            src="/resepku-new.png"
            alt="resepku"
            width={"200px"}
            className="max-w-[200px]"
          />
        </Link>
      </figure>

      <nav className="flex items-center gap-4">
        <Link
          to={"/login"}
          className="flex items-center cursor-pointer text-black bg-[#9EC8B9] hover:bg-[#9ecdbc] py-2 px-4 rounded-md font-medium">
          Masuk
        </Link>
      </nav>
    </header>
  );
};
