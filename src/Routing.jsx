import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import ScrollToTop from "./components/ui/ScrollToTop";
import Udashboard from "./pages/Udashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Payment from "./pages/Payment";
import PayProcess from "./pages/PayProcess";
import Orders from "./pages/Orders";
import Api from "./pages/Api";
import Wallet from "./pages/Wallet";

const Routing = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<Home />} />
        <Route path="/apis" element={<Api />} />

        {/* Protected Routes */}
        <Route 
          path="/user/dashboard" 
          element={
            <ProtectedRoute>
              <Udashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/neworders" 
          element={
            <ProtectedRoute>
              <Udashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/orders" 
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/wallet" 
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/addfund" 
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/user/payprocess/:amount" 
          element={
            <ProtectedRoute>
              <PayProcess />
            </ProtectedRoute>
          } 
        />
        

        {/* Catch-All Route */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;