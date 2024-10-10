import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Loader from "../src/components/shared/loader";

// Lazy load your components
const SignInPage = React.lazy(() => import("./auth/sign-in/index.jsx"));
const Home = React.lazy(() => import("./home"));
const Dashboard = React.lazy(() => import("./dashboard"));
const EditResume = React.lazy(() =>
  import("./dashboard/resume/[resumeId]/edit/index.jsx")
);
const ViewResume = React.lazy(() =>
  import("./my-resume/[resumeId]/view/index.jsx")
);

/**
 * PUBLISHABLE_KEY from .env file
 * I got this key from my clerk account
 */
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

/**
 * Defining the application's routes using createBrowserRouter.
 * Routes map URLs to specific React components, allowing navigation within the app.
 */
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: (
          <Suspense fallback={<Loader />}>
            <EditResume />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/auth/sign-in",
    element: (
      <Suspense fallback={<Loader />}>
        <SignInPage />
      </Suspense>
    ),
  },
  {
    path: "/my-resume/:resumeId/view",
    element: (
      <Suspense fallback={<Loader />}>
        <ViewResume />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
