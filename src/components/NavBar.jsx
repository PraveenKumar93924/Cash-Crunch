import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "boxicons";

// NOTE: we do *not* import logo here - we just use the public path.
// It will work on GitHub Pages because base is set!
const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    console.log("User logged out");
    navigate("/login");
  };

  // List of routes that show the Profile button
  const profileRoutes = [
    "/home",
    "/payments",
    "/passkey",
    "/online-payment",
    "/transactions",
  ];

  const showProfileButton = profileRoutes.includes(location.pathname);

  return (
    <nav className="h-[10vh] w-full flex justify-between items-center border-b-1 border-primary">
      <div className="flex items-end gap-1">
        <img
          src="/Cash-Crunch/logo.svg"
          alt="Cash Crunch Logo"
          className="hidden min-[400px]:block w-[50px]"
        />
        <h2 className="text-2xl lg:text-3xl">
          <Link to="/home" className="hover:underline">
            Cash Crunch.
          </Link>
        </h2>
      </div>

      {/* Right side buttons */}
      <div className="flex gap-4">
        {showProfileButton && (
          <Link to="/profile">
            <Button
              color="primary"
              startContent={<box-icon name="user-circle" color="#fff" />}
              className="hover:underline text-md md:text-lg"
            >
              Profile
            </Button>
          </Link>
        )}

        <a
          href="https://www.linkedin.com/in/shouryasaxena"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            color="primary"
            startContent={<box-icon name="log-in-circle" color="#fff" />}
            className="hover:underline text-md md:text-lg"
          >
            Contact me
          </Button>
        </a>

        <Button
          color="error"
          startContent={<box-icon name="log-out-circle" color="#fff" />}
          className="hover:underline text-md md:text-lg"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
