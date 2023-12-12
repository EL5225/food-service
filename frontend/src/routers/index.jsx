import { createBrowserRouter, defer } from "react-router-dom";
import { lazily } from "react-lazily";
import { Suspense } from "react";
import { Loading, Navbar } from "../components";
import { AdminProtected, Protected, UnProtected } from "./guard";
import { ContentLayout, DashboardLayout } from "../layouts";
import { getCategory, getResepById } from "../utils";

const {
  Home,
  Login,
  Register,
  Beranda,
  DetailPage,
  Favorit,
  CreateResepPage,
  EditResepPage,
  Profile,
  VerifyOTP,
} = lazily(() => import("../pages"));

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
    path: "/verify-otp",
    element: (
      <UnProtected>
        <Suspense fallback={<Loading />}>
          <VerifyOTP />
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
        element: <Favorit />,
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
      {
        path: "createresep",
        element: (
          <AdminProtected>
            <CreateResepPage />
          </AdminProtected>
        ),
        loader: async () => {
          const dataPromise = getCategory();

          return defer({
            category: dataPromise,
          });
        },
      },
      {
        path: "editresep/:id",
        element: (
          <AdminProtected>
            <EditResepPage />
          </AdminProtected>
        ),
        loader: async ({ params }) => {
          const { id } = params;
          const dataResep = getResepById(id);

          return defer({
            resep: dataResep,
          });
        },
      },
    ],
  },
]);

export default router;
