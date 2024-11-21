import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import colors from "../colors";
import { BiLeftArrowAlt } from "react-icons/bi";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("userLoggedIN");
    localStorage.removeItem("userData");
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  // Define routes where the back arrow should not appear
  const noBackArrowRoutes = ["/", "/login"];

  return (
    <nav
      className="flex h-16 p-4 text-white z-20"
      style={{ backgroundColor: colors.primary }}
    >
      <div className="justify-center align-middle items-center self-center w-8 overflow-hidden">
        {!noBackArrowRoutes.includes(location.pathname) && (
          <BiLeftArrowAlt
            size={30}
            color="white"
            onClick={() => navigate(-1)}
          />
        )}
      </div>

      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">
          Wolo
        </Link>
        <div>
          {localStorage?.getItem("userLoggedIN") ? (
            <button
              onClick={handleLogout}
              className="bg-secondary text-white px-6 py-2 rounded-lg mx-2"
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
