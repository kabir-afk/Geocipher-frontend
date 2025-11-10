import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinstance";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const GoogleAuth = ({ onError }) => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  async function sendCredentials(credentialResponse) {
    try {
      await axiosInstance.post("api/v1/auth/google", credentialResponse);
      setIsLoggedIn(true);
      navigate("/single-player-mode");
    } catch (error) {
      onError(error.response.data);
      console.error(error.response.data);
    }
  }
  return (
    <div className="w-full ">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          sendCredentials(credentialResponse);
        }}
        onError={() => {
          onError("Google Login Failed");
        }}
      />
    </div>
  );
};

export default GoogleAuth;
