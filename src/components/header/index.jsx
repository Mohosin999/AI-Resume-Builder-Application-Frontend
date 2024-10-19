import React from "react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "../ui/button";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className="p-3 px-5 flex justify-between items-center shadow-sm md:shadow-md">
      {/* Click on header logo and go to dashboard */}
      <Link to={"/"}>
        <img
          src="/logo.svg"
          className="cursor-pointer"
          width={100}
          height={100}
        />
      </Link>

      {/*
       * Check if user is authenticated, show Dashboard and
       * UserProfile button.
       * Otherwise, show Get Started button to create account.
       */}
      {isSignedIn ? (
        <div className="flex gap-3 items-center">
          <Link to={"/dashboard"}>
            <Button variant="outline">Dashboard</Button>
          </Link>
          {/* User profile button */}
          <UserButton />
        </div>
      ) : (
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
