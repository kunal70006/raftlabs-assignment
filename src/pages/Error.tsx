import { useRouteError } from "react-router-dom";
import { ErrorPage } from "../types";

const ErrorPage = () => {
  const err = useRouteError() as ErrorPage;
  return (
    <div className="flex h-screen items-center justify-center flex-col">
      <h1 className="">This isn't supposed to happen.</h1>
      <p className="">Something broke.</p>
      <p className="">
        <i>{err.statusText || err.message}</i>
      </p>
    </div>
  );
};

export default ErrorPage;
