/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from "react";
import { RootLayout } from "../layout";
import { PrivateRoute } from "../components";
import { APP_ROUTES } from "./constants";

const LandingPage = lazy(() =>
  import("../pages/LandingPage").then((module) => ({
    default: module.LandingPage,
  })),
);

const NotFoundPage = lazy(() =>
  import("../pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })),
);

const RegisterPage = lazy(() =>
  import("../pages/RegisterPage").then((module) => ({
    default: module.RegisterPage,
  })),
);

const LoginPage = lazy(() =>
  import("../pages/LoginPage").then((module) => ({
    default: module.LoginPage,
  })),
);

const HomePage = lazy(() =>
  import("../pages/HomePage").then((module) => ({
    default: module.HomePage,
  })),
);

const ChallengePage = lazy(() =>
  import("../pages/ChallengePage").then((module) => ({ default: module.ChallengePage })),
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
          { path: "/home/challenges/:challengeId", element: <ChallengePage /> },
          { path: "/home", element: <HomePage /> },
          { path: "/", element: <Navigate to={APP_ROUTES.HOME} /> },
        ],
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);
