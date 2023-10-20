import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Home";
import ErrorPage from "../pages/Error";

const router = createBrowserRouter([
  { path: "/", element: <Homepage />, errorElement: <ErrorPage /> },
]);

export default router;
