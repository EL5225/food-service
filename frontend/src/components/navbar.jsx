import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="w-full p-6 flex items-center border-2 justify-between">
      <figure>
        <figcaption>
          <Link to={"/"} className="cursor-pointer">
            Logo
          </Link>
        </figcaption>
      </figure>

      <nav className="flex items-center gap-4">
        <Link to={"/login"} className="cursor-pointer">
          Login
        </Link>
        <Link to={"/register"} className="cursor-pointer">
          Register
        </Link>
      </nav>
    </header>
  );
};
