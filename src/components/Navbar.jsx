// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import colors from "../colors";
import { store } from "../redux/store";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIN");
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };
  return (
    <nav
      className="flex h-16 p-4 text-white z-20"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="container mx-auto flex justify-between items-cente">
        <Link to="/" className="text-3xl font-bold">
          Wolo
        </Link>
        <div>
          {localStorage?.getItem("userLoggedIN") ? (
            <button
              onClick={handleLogout}
              className=" bg-secondary text-white px-6 py-2 rounded-lg mx-2"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="px-4">
              Login
            </Link>
          )}
          {/* <Link to="/signup" className="px-4">
            Signup
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
