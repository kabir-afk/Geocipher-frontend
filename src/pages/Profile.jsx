import { useEffect, useState } from "react";
import axiosInstance from "../axiosinstance";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [data, setData] = useState("");
  useEffect(() => {
    const fetchPtotectedData = async () => {
      try {
        const response = await axiosInstance.get("api/v1/protected-view/");
        setData(response.data.username);
        console.log("response : ", response.data);
      } catch (error) {
        console.error("Error fetching data : ", error.response.data.detail);
      }
    };
    fetchPtotectedData();
  }, []);
  return (
    <div>
      <Navbar />
      {data}
    </div>
  );
};

export default Profile;
