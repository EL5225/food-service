import { createBrowserRouter } from "react-router-dom";
import { lazily } from "react-lazily";
import { Suspense } from "react";
import { Navbar, Spinner } from "../components";
const { Home, Login, Register } = lazily(() => import("../pages"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Spinner />}>
        <Navbar />
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Spinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<Spinner />}>
        <Register />
      </Suspense>
    ),
  },
]);

export default router;
