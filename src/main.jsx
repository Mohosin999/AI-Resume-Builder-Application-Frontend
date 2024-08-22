import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import SignInPage from "./auth/sign-in/index.jsx";
import Home from "./home";
import Dashboard from "./dashboard";
import EditResume from "./dashboard/resume/[resumeId]/edit/index.jsx";

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
        element: <Dashboard />,
      },
      {
        path: "/dashboard/resume/:resumeId/edit",
        element: <EditResume />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/sign-in",
    element: <SignInPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*
     * ClerkProvider wraps the application to provide authentication features.
     * RouterProvider is used to manage navigation based on the defined routes.
     */}
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
