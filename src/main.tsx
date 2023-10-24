import React from "react";
import ReactDOM from "react-dom/client";
import router from "./routes";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { GraphQLProvider } from "./providers/graphQLProvider";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GraphQLProvider>
      <RouterProvider router={router} />
    </GraphQLProvider>
    <Toaster toastOptions={{ className: "bg-neutral-800 text-white" }} />
  </React.StrictMode>
);
