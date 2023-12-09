import { useShowSidebar } from "../utils";
import { Button } from "./button";
import { GiHamburgerMenu } from "react-icons/gi";

export const SideButton = () => {
  const { getShowSidebar, setShowSidebar } = useShowSidebar();

  const handleClick = () => {
    setShowSidebar(!getShowSidebar);
  };

  return (
    <header className="fixed top-0 bg-white z-40 w-full h-[5rem] py-6 px-10 lg:hidden flex items-center shadow-sm">
      <Button width="w-fit" onClick={handleClick}>
        <GiHamburgerMenu className="text-xl" />
      </Button>
    </header>
  );
};
