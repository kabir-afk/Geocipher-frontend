import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import GoogleAuth from "../components/GoogleAuth";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/v1/auth/", {
        username,
        email,
        password,
      });
      navigate("/single-player-mode");
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };
  return (
    <div className="bg-onyx rounded-md p-5 w-1/5 absolute top-1/2 left-1/2 -translate-1/2">
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
      {/* <div className="mt-5 rounded-md">
        <GoogleAuth />
      </div> */}
      <button
        type="submit"
        onClick={() => navigate("/login")}
        className="bg-cinnabar text-white rounded-md text-sm font-medium uppercase py-2 px-3 mt-5 hover:scale-105 active:scale-95 cursor-pointer"
      >
        Login <i className="fa fa-fw fa-chevron-right"></i>
      </button>
      <button
        className="text-white rounded-md text-sm font-medium uppercase py-2 px-3 mt-5 hover:scale-105 active:scale-95 cursor-pointer"
        onClick={() => {
          navigate("/single-player-mode");
        }}
      >
        Skip for now
      </button>
    </div>
  );
};

export default Register;
