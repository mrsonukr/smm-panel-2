import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Uheader from "../componets/Uheader";
import Purchase from "../componets/ui/Purchase";
import Uborder from "../componets/ui/Uborder";

const Udashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <div>
        <Uheader />
        <Uborder />
        <Purchase />
      </div>
    </>
  );
};

export default Udashboard;
