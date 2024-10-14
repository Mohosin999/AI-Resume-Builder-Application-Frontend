import "./App.css";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/header";
import { Toaster } from "./components/ui/sonner";
import Footer from "./components/footer";

function App() {
  /**
   * The isLoaded is a boolean value that indicates whether the user
   * data has been fully loaded or not.
   */
  const { isLoaded, isSignedIn } = useUser();

  /**
   * If the user is not authenticated and all user data is fully loaded,
   * navigate the user to the sign-in page.
   */
  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
      <Footer />
    </>
  );
}

export default App;
