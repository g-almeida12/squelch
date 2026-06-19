import { Navigate, Outlet } from "react-router-dom";
import { useGetUser } from "../../services/user/hooks/queries.hooks";
import { APP_ROUTES } from "../../config/constants";

export function PrivateRoute() {
  const { isFetching, isError } = useGetUser();

  if (isError) {
    <Navigate to={APP_ROUTES.LOGIN} replace />;
  } else if (isFetching) {
    return <LoadingFallback />;
  }

  return <Outlet />;
}

function LoadingFallback() {
  return <div className="w-full min-h-dvh bg-main"></div>;
}
