import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { useContext, useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../axiosinstance";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div
      className="bg-gray-600 opacity-55 backdrop-blur-3xl text-white  
                w-full md:w-auto md:rounded-3xl"
    >
      <button
        className="block md:hidden p-2 cursor-pointer"
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
      >
        <img src="/hamburger-icon.svg" alt="menu-icon" />
      </button>
      <div
        className={`${
          isMenuOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-start gap-3 p-2 *:cursor-pointer *:hover:text-black`}
      >
        {isLoggedIn ? (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/single-player-mode">Single Player Mode</Link>
            <Link to="/multi-player-mode">Multi Player Mode</Link>
            <button
              onClick={async () => {
                await axiosInstance.post("api/v1/logout/", {});
                navigate("/");
                Cookies.remove("accessToken");
                setIsLoggedIn(false);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/single-player-mode">Play now</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
