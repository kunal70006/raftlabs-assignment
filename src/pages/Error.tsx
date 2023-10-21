import { useRouteError } from "react-router-dom";
import { ErrorPage } from "../types";
import RootLayout from "../common/RootLayout";

const ErrorPage = () => {
  const err = useRouteError() as ErrorPage;
  return (
    <RootLayout>
      <div className="flex items-center justify-center flex-col text-xl font-bold gap-4">
        <h1 className="">This isn't supposed to happen.</h1>
        <p className="font-semibold">Something broke.</p>
        <p className="text-gray-400 mt-2 font-medium">
          <i>{err.statusText || err.message}</i>
        </p>
      </div>
    </RootLayout>
  );
};

export default ErrorPage;
