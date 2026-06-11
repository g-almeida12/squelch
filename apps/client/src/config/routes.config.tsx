/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

const LandingPage = lazy(() => import("../pages/LandingPage/LandingPage"));

export const router = createBrowserRouter([
  {
    path: "/landing-page",
    element: (
      <Suspense fallback={<SuspenseFallback />}>
        <LandingPage />
      </Suspense>
    ),
  },
]);

function SuspenseFallback() {
  return <div className="bg-main"></div>;
}
