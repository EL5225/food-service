import { createBrowserRouter } from "react-router-dom";
import { lazily } from "react-lazily";
import { Suspense } from "react";
import { Navbar, Spinner } from "../components";
import { Register } from "../pages";
const { Home, Login } = lazily(() => import("../pages"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <Navbar />
        <Home />,
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Spinner />}>
        <Navbar />
        <Login />,
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Spinner />}>
        <Navbar />
        <Register />,
      </Suspense>
    ),
  },
]);

export default router;
