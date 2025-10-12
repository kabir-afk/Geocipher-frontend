import { useEffect } from "react";
import axiosInstance from "../axiosinstance";

const Profile = () => {
  useEffect(() => {
    const fetchPtotectedData = async () => {
      try {
        const response = await axiosInstance.get("api/v1/protected-view/");

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
