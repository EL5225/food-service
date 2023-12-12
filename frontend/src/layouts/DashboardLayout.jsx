import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Loading, Sidebar, SideButton } from "../components";

export const DashboardLayout = () => {
  document.body.style.overflow = "hidden";
  return (
    <main className="w-full h-screen flex">
      <Sidebar />
      <section className="lg:w-[80%] w-full h-full flex flex-col justify-center items-center ">
        <Suspense fallback={<Loading />}>
          <SideButton />
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
};
