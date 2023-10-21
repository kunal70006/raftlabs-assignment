import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Home";
import ErrorPage from "../pages/Error";
import AuthProvider from "../providers/SupabaseProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Homepage />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
