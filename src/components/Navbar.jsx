import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div className="w-fit px-4 absolute z-10 top-5 left-1/2 transform -translate-x-1/2 bg-gray-600 opacity-55 backdrop-blur-3xl p-2 text-white rounded-3xl flex justify-between gap-4">
      {isLoggedIn ? (
        <>
          <Link to="/profile" className="cursor-pointer hover:text-black">
            Profile
          </Link>
          <button onClick={logout} className="cursor-pointer hover:text-black">
            Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" className="cursor-pointer hover:text-black">
            Login
          </Link>
          <Link to="/" className="cursor-pointer hover:text-black">
            Register
          </Link>
          <Link
            to="/single-player-mode"
            className="cursor-pointer hover:text-black"
          >
            Play now
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
