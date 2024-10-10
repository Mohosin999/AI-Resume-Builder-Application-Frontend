// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { ClerkProvider } from "@clerk/clerk-react";
// import SignInPage from "./auth/sign-in/index.jsx";
// import Home from "./home";
// import Dashboard from "./dashboard";
// import EditResume from "./dashboard/resume/[resumeId]/edit/index.jsx";
// import ViewResume from "./my-resume/[resumeId]/view/index.jsx";

// /**
//  * PUBLISHABLE_KEY from .env file
//  * I got this key from my clerk account
//  */
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// /**
//  * Defining the application's routes using createBrowserRouter.
//  * Routes map URLs to specific React components, allowing navigation within the app.
//  */
// const router = createBrowserRouter([
//   {
//     element: <App />,
//     children: [
//       {
//         path: "/dashboard",
//         element: <Dashboard />,
//       },
//       {
//         path: "/dashboard/resume/:resumeId/edit",
//         element: <EditResume />,
//       },
//     ],
//   },
//   {
//     path: "/",
//     element: <Home />,
//   },
//   {
//     path: "/auth/sign-in",
//     element: <SignInPage />,
//   },
//   {
//     path: "/my-resume/:resumeId/view",
//     element: <ViewResume />,
//   },
// ]);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     {/*
//      * ClerkProvider wraps the application to provide authentication features.
//      * RouterProvider is used to manage navigation based on the defined routes.
//      */}
//     <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
//       <RouterProvider router={router} />
//     </ClerkProvider>
//   </StrictMode>
// );

import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { LoaderCircle } from "lucide-react";

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
 * Fallback for Suspense - Use the logo as a loading indicator
 */
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <LoaderCircle className="animate-spin mr-1" />
    <img src="/logo.svg" alt="Loading..." width="100" height="100" />
  </div>
);

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
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <EditResume />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/auth/sign-in",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <SignInPage />
      </Suspense>
    ),
  },
  {
    path: "/my-resume/:resumeId/view",
    element: (
      <Suspense fallback={<LoadingFallback />}>
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
