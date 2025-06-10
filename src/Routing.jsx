import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
// import Udashboard from "./pages/Udashboard";
// import Api from "./pages/Api";
// import Payment from "./pages/Payment";
// import PayProcess from "./pages/PayProcess";
// import Orders from "./pages/Orders";
import ScrollToTop from "./components/ui/ScrollToTop";

const Routing = () => {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* Place it inside BrowserRouter */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="*" element={<NoPage />} />
        <Route path="/login" element={<Home />} />
        {/* <Route path="/user/dashboard" element={<Udashboard />} />
        <Route path="/user/neworders" element={<Udashboard />} />
        <Route path="/apis" element={<Api />} />
        <Route path="/user/addfund" element={<Payment />} />
        <Route path="/user/orders" element={<Orders />} />
        <Route path="/user/payprocess/:amount" element={<PayProcess />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;