import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";

const Profile = () => {
  const { accessToken } = useContext(AuthContext);
  useEffect(() => {
    const fetchPtotectedData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/protected-view/",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("response : ", response.data);
      } catch (error) {
        console.error("Error fetching data : ", error);
      }
    };
    fetchPtotectedData();
  }, []);
  return <div>Profile page</div>;
};

export default Profile;
