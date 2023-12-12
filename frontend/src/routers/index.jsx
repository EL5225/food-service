import { Link, createBrowserRouter, defer } from "react-router-dom";
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
          <ContentLayout className="bg-[#9EC8B9] text-slate-50" />
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
    ErrorBoundary: () => <div>Error</div>,
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
  {
    path: "*",
    element: (
      <section className="flex h-screen justify-center items-center bg-[#9EC8B9] dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
              404
            </h1>
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Halaman tidak ditemukan
            </p>
            <p className="mb-4 text-lg font-light text-gray-700 dark:text-gray-600">
              Maaf halaman yang anda cari tidak ada
            </p>
            <Link
              href="/"
              className="inline-flex text-black bg-primary-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">
              Kembali
            </Link>
          </div>
        </div>
      </section>
    ),
  },
]);

export default router;
