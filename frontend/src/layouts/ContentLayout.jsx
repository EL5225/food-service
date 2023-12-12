import { Outlet } from "react-router-dom";

export const ContentLayout = ({ className }) => {
  return (
    <main
      className={`w-full md:h-[85vh] flex flex-col items-center justify-center bg-[#9EC8B9] ${className}`}>
      <Outlet />
    </main>
  );
};
