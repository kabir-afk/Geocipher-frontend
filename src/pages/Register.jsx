import React from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  async function sendCredentials(credentialResponse) {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/v1/auth/google",
      credentialResponse
    );
    console.log(res);
    navigate("/single-player-mode");
  }

  return (
    <>
      <h1>login page</h1>
      <div className="w-1/4 ">
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            sendCredentials(credentialResponse);
            console.log(credentialResponse);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
      <button
        onClick={() => {
          navigate("/single-player-mode");
        }}
      >
        Skip for now
      </button>
    </>
  );
};

export default Register;
