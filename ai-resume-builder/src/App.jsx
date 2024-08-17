import "./App.css";
import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  // If user is not authenticated, then navigate the user in sign-in page
  if (!isSignedIn && isLoaded) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
