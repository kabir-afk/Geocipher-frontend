import { Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div className="w-fit px-4 absolute z-10 top-5 left-1/2 transform -translate-x-1/2 bg-gray-600 opacity-55 backdrop-blur-3xl p-2 text-white rounded-3xl flex justify-between gap-4 [&>*]:cursor-pointer [&>*]:hover:text-black">
      {isLoggedIn ? (
        <>
          <Link to="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
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
