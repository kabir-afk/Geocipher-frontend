import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../axiosinstance";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="w-fit px-4 absolute z-10 top-5 left-1/2 transform -translate-x-1/2 bg-gray-600 opacity-55 backdrop-blur-3xl p-2 text-white rounded-3xl flex justify-between gap-4 [&>*]:cursor-pointer [&>*]:hover:text-black">
      {isLoggedIn ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/single-player-mode">single player mode</Link>
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
