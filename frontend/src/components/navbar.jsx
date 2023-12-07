import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="relative w-full p-6 flex items-center justify-between bg-black md:h-[12vh]">
      <figure>
        <Link to={"/"} className="cursor-pointer">
          <img src="/resepku-plain-cut.png" alt="resepku" width={"200px"} />
        </Link>
      </figure>

      <nav className="flex items-center gap-4">
        <Link
          to={"/login"}
          className="flex items-center cursor-pointer bg-slate-50 hover:bg-gray-100 py-2 px-4 rounded-md font-medium">
          Masuk
        </Link>
      </nav>
    </header>
  );
};
