import { createBrowserRouter, defer } from "react-router-dom";
import { lazily } from "react-lazily";
import { Suspense } from "react";
import { Loading, Navbar } from "../components";
import { Protected, UnProtected } from "./guard";
import { ContentLayout, DashboardLayout } from "../layouts";
import { Profile } from "../pages";
import { getAllSavedResep, getResepById } from "../utils";

const { Home, Login, Register, Beranda, DetailPage, FavoritPage } = lazily(() =>
  import("../pages")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UnProtected>
        <Suspense
          fallback={
            <Loading
              backgroundColor="bg-black"
              color="fill-white text-zinc-700"
            />
          }>
          <Navbar />
          <ContentLayout className="bg-black text-slate-50" />
        </Suspense>
      </UnProtected>
    ),
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <UnProtected>
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      </UnProtected>
    ),
  },
  {
    path: "/register",
    element: (
      <UnProtected>
        <Suspense fallback={<Loading />}>
          <Register />
        </Suspense>
      </UnProtected>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Protected>
        <DashboardLayout />
      </Protected>
    ),
    children: [
      {
        path: "",
        element: <Beranda />,
      },
      {
        path: "favorites",
        element: <FavoritPage />,
        loader: async () => {
          const dataPromise = getAllSavedResep();

          return defer({
            saved: dataPromise,
          });
        },
      },
      {
        path: "detail/:id",
        element: <DetailPage />,
        loader: async ({ params }) => {
          const { id } = params;
          const dataPromise = getResepById(id);

          return defer({
            resep: dataPromise,
          });
        },
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
