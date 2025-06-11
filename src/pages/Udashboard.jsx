import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Uheader from "../components/Uheader";
import Uborder from "../components/ui/Uborder";
import Product from "../components/ui/Purchase";

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
        <Product />
      </div>
    </>
  );
};

export default Udashboard;
