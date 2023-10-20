import { useRouteError } from "react-router-dom";
import { ErrorPage } from "../types";

const ErrorPage = () => {
  const err = useRouteError() as ErrorPage;
  return (
    <div className="flex h-screen items-center justify-center flex-col text-xl font-bold gap-4">
      <h1 className="">This isn't supposed to happen.</h1>
      <p className="font-semibold">Something broke.</p>
      <p className="text-gray-400 mt-2 font-medium">
        <i>{err.statusText || err.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
