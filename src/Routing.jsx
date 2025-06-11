import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import ScrollToTop from "./components/ui/ScrollToTop";
import Udashboard from "./pages/Udashboard";

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
        <Route path="/user/dashboard" element={<Udashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;