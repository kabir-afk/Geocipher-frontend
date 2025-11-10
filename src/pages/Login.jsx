import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import Cookies from "js-cookie";
import axiosInstance from "../axiosinstance";
import GoogleAuth from "../components/GoogleAuth";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("api/token/", {
        username,
        password,
      });
      if (response.data.access) {
        Cookies.set("accessToken", response.data.access);
        setIsLoggedIn(true);
      }
      navigate("/single-player-mode");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid username or password.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  const handleError = (errorData) => {
    const errorMsg = Object.values(errorData)[0];
    toast.error(errorMsg);
  };

  return (
    <div className="bg-custom-gradient min-h-screen font-overpass">
      <Toaster />
      <div className="bg-onyx rounded-md p-5 w-[50%] md:w-1/3 lg:w-1/4 absolute top-1/2 left-1/2 -translate-1/2">
        <form className="flex flex-col" onSubmit={handleLogin}>
          <input
            id="name"
            type="text"
            placeholder="John Doe"
            className="border-b border-cosmiclatte pb-1 mb-1 outline-none bg-transparent text-cosmiclatte text-sm font-light"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            id="password"
            type="password"
            placeholder="********"
            className="border-b border-cosmiclatte pb-1 mb-1 outline-none bg-transparent text-cosmiclatte text-sm font-light"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-cinnabar text-white rounded-md text-sm font-medium uppercase py-2 px-3 mt-5 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Login <i className="fa fa-fw fa-chevron-right"></i>
          </button>
          <small>{error && <div className="text-red-400">{error}</div>}</small>
        </form>

        <div className="w-full flex items-center text-white uppercase text-xs my-3">
          <div className="grow border-t border-gray-500"></div>
          <span className="mx-2 text-gray-300">or</span>
          <div className="grow border-t border-gray-500"></div>
        </div>

        <div className="rounded-md ">
          <GoogleAuth onError={handleError} />
        </div>
        <button
          className="text-white rounded-md text-sm font-medium uppercase py-2 px-3 mt-5 hover:scale-105 active:scale-95 cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        >
          Create an account
        </button>
      </div>
    </div>
  );
};

export default Login;
