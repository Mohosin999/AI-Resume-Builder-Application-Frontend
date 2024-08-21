import React from "react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "../../ui/button";

const Header = () => {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-3 py-5 flex justify-between shadow-md">
      <img src="./logo.svg" width={100} height={100} />

      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          {/* User profile */}
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
