import React from "react";
import ReactDOM from "react-dom/client";
import router from "./routers";
import { RouterProvider } from "react-router-dom";
import "@smastrom/react-rating/style.css";
import "./index.css";
import { RecoilProvider } from "./providers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilProvider>
      <RouterProvider router={router} />
    </RecoilProvider>
  </React.StrictMode>
);
