/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { RootLayout } from "../layout";
import { PrivateRoute } from "../components";
import { APP_ROUTES } from "./constants";

const LandingPage = lazy(() =>
  import("../pages").then((module) => ({
    default: module.LandingPage,
  })),
);

const NotFoundPage = lazy(() =>
  import("../pages").then((module) => ({ default: module.NotFoundPage })),
);

const RegisterPage = lazy(() =>
  import("../pages").then((module) => ({
    default: module.RegisterPage,
  })),
);

const LoginPage = lazy(() =>
  import("../pages").then((module) => ({
    default: module.LoginPage,
  })),
);

const HomePage = lazy(() =>
  import("../pages").then((module) => ({
    default: module.HomePage,
  })),
);

export const router = createBrowserRouter([
  // Public routes
  {
    element: <RootLayout />,
    children: [
      { path: "/landing-page", element: <LandingPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },

  // Private routes
  {
    element: <RootLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          { path: "/", element: <Navigate to={APP_ROUTES.HOME} /> },
          { path: "/home", element: <HomePage /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
