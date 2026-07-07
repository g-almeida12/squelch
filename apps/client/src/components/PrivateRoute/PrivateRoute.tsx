import { Navigate, Outlet } from "react-router-dom";
import { useGetUserProfile } from "../../features/user/hooks/user.queries";
import { APP_ROUTES } from "../../config/constants";

export function PrivateRoute() {
  const { isLoading, isError } = useGetUserProfile();

  if (isError) {
    return <Navigate to={APP_ROUTES.LOGIN} replace />;
  } else if (isLoading) {
    return <LoadingFallback />;
  }

  return <Outlet />;
}

function LoadingFallback() {
  return <div className="w-full min-h-dvh bg-main"></div>;
}
