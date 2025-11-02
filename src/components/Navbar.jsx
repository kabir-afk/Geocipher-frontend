import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../axiosinstance";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-nowrap items-center justify-between gap-4 px-4 py-2 
                bg-gray-600/55 backdrop-blur-3xl text-white rounded-3xl 
                w-auto max-w-full overflow-x-auto *:cursor-pointer *:hover:text-black"
    >
      {isLoggedIn ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/single-player-mode">Single Player Mode</Link>
          <Link to="/multi-player-mode">Multi Player Mode</Link>
          <button
            onClick={async () => {
              const response = await axiosInstance.post("api/v1/logout/", {});
              console.log(response.data);
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
  );
};

export default Navbar;
