import { useGoogleLogin } from "@react-oauth/google";
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
      onError(error.response?.data || "Something went wrong");
      console.error(error);
    }
  }
  const login = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (credentialResponse) => {
      sendCredentials(credentialResponse);
    },
    onError: (err) => {
      onError("Google login failed");
      console.error(err);
    },
  });
  return (
    <div className="w-full bg-white font-overpass rounded-md">
      <button
        onClick={() => login()}
        className="cursor-pointer w-full flex items-center justify-center gap-2 py-2"
      >
        <img src="/google.png" alt="google-icon" className="w-5 h-5" />
        <span className="text-sm font-medium text-gray-700">
          Sign in with Google
        </span>
      </button>
    </div>
  );
};

export default GoogleAuth;
