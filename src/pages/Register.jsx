import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import { AuthContext } from "../components/AuthContext";
import axiosInstance from "../axiosinstance";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { setIsLoggedIn } = useContext(AuthContext);
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("api/v1/auth/", {
        username,
        email,
        password,
      });
      Cookies.set("accessToken", response.data.access);
      setIsLoggedIn(true);
      navigate("/single-player-mode");
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };
  return (
    <div className="bg-custom-gradient min-h-screen font-overpass">
      <div className="w-full absolute z-10 left-1/2 transform -translate-x-1/2 md:top-5 flex flex-col justify-center items-center gap-3">
        <Navbar />
      </div>
      <div className="bg-onyx rounded-md p-5 w-[50%] md:w-1/3 lg:w-1/4 absolute top-1/2 left-1/2 -translate-1/2">
        <form className="flex flex-col" onSubmit={handleRegistration}>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="border-b border-cosmiclatte pb-1 mb-1 outline-none bg-transparent text-cosmiclatte text-sm font-light"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <small>
            {errors.username && (
              <div className="text-red-400">{errors.username}</div>
            )}
          </small>
          <input
            id="username"
            type="email"
            placeholder="johndoe@example.com"
            className="border-b border-cosmiclatte pb-1 mb-1 outline-none bg-transparent text-cosmiclatte text-sm font-light"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <small>
            {errors.email && <div className="text-red-400">{errors.email}</div>}
          </small>
          <input
            id="password"
            type="password"
            placeholder="********"
            className="border-b border-cosmiclatte pb-1 mb-1 outline-none bg-transparent text-cosmiclatte text-sm font-light"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <small>
            {errors.password && (
              <div className="text-red-400">{errors.password}</div>
            )}
          </small>
          <button
            type="submit"
            className="bg-cinnabar text-white rounded-md text-sm font-medium uppercase py-2 px-3 mt-5 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Register <i className="fa fa-fw fa-chevron-right"></i>
          </button>
        </form>
        <div className="w-full flex items-center text-white uppercase text-xs my-3">
          <div className="grow border-t border-gray-500"></div>
          <span className="mx-2 text-gray-300">or</span>
          <div className="grow border-t border-gray-500"></div>
        </div>
        <div className="mt-5 rounded-md">
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Register;
