import { Outlet } from "react-router-dom";

export const ContentLayout = ({ className }) => {
  return (
    <main
      className={`w-full md:h-[88vh] flex flex-col items-center justify-center ${className}`}>
      <Outlet />
    </main>
  );
};
