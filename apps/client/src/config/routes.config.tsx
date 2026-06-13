/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { RootLayout } from "../layout";

const LandingPage = lazy(() =>
  import("../pages").then((module) => ({
    default: module.LandingPage,
  })),
);

const NotFoundPage = lazy(() =>
  import("../pages").then((module) => ({ default: module.NotFoundPage })),
);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/landing-page", element: <LandingPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
