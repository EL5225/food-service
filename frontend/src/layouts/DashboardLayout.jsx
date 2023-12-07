import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Loading, Sidebar } from "../components";

export const DashboardLayout = () => {
  return (
    <main className="w-full h-screen flex">
      <Sidebar />
      <section className="lg:w-[80%] w-full h-full flex justify-center items-center">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </section>
    </main>
  );
};
