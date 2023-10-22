import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Home";
import ErrorPage from "../pages/Error";
import AuthProvider from "../providers/SupabaseProvider";
import Profile from "../pages/Profile";

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
  {
    path: "/profile",
    element: (
      <AuthProvider>
        <Profile />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
