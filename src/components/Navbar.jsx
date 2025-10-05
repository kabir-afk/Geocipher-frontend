import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-fit px-4 absolute z-10 top-5 left-1/2 transform -translate-x-1/2 bg-gray-600 opacity-55 backdrop-blur-3xl p-2 text-white rounded-3xl flex justify-between gap-4">
      <Link to="/" className="cursor-pointer hover:text-black">
        Register
      </Link>
      <p className="cursor-pointer hover:text-black">Multiplayer mode</p>
      <p className="cursor-pointer hover:text-black">Profile</p>
    </div>
  );
};

export default Navbar;
