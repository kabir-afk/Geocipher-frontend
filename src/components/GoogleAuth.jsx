import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinstance";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  async function sendCredentials(credentialResponse) {
    try {
      const res = await axiosInstance.post(
        "api/v1/auth/google",
        credentialResponse
      );
      console.log(res);
      setIsLoggedIn(true);
      navigate("/single-player-mode");
    } catch (error) {
      console.error(error.response.data);
    }
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
