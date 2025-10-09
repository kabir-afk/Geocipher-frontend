import React from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const GoogleAuth = () => {
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
    <div className="w-full ">
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
  );
};

export default GoogleAuth;
