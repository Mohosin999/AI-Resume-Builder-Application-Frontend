import React from "react";
import { Link } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "../ui/button";
// import ThemeSwitcher from "../theme-switcher";

function Header() {
  const { isSignedIn } = useUser();

  return (
    <div className="bg-[#14202D] p-3 px-5 flex justify-between items-center shadow-md ">
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
        <div className="flex gap-5 items-center">
          {/* <ThemeSwitcher /> */}
          {/* Dashboard */}
          <Link to={"/dashboard"}>
            <Button size="sm">Dashboard</Button>
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
