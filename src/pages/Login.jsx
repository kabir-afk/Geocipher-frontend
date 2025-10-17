import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import Cookies from "js-cookie";
import axiosInstance from "../axiosinstance";
import GoogleAuth from "../components/GoogleAuth";

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

  return (
    <div className="bg-onyx rounded-md p-5 w-1/5 absolute top-1/2 left-1/2 -translate-1/2">
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
      <div className="mt-5 rounded-md">
        <GoogleAuth />
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
  );
};

export default Login;
