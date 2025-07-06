import React from "react";
import { Button } from "@nextui-org/react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import "boxicons";
import logo from "/logo.svg";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    console.log("User logged out");
    navigate("/login");
  };

  // Check if the current route is Home, Payments, or QR Code pages
  const showProfileButton =
    location.pathname === "/home" ||
    location.pathname === "/payments" ||
    location.pathname === "/passkey";
    location.pathname === "/online-payment";
    location.pathname === "/transactions";




  return (
    <nav className="h-[10vh] w-full flex justify-between items-center border-b-1 border-primary">
      <div className="flex items-end gap-1">
        <img
          src={logo}
          alt="Convertio logo"
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
        {/* Profile button to the left of Contact Me */}
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

        {/* Contact me button */}
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

        {/* Logout button */}
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
