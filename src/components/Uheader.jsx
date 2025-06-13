import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  PlusCircle,
  ShoppingCart,
  Wallet2,
  ListOrdered,
  HelpCircle,
} from "lucide-react";

const Uheader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0.0);
  const navigate = useNavigate();
  const location = useLocation();

  // Load wallet balance from localStorage
  useEffect(() => {
    const updateBalance = () => {
      const savedBalance = localStorage.getItem("walletBalance");
      if (savedBalance) {
        setWalletAmount(parseFloat(savedBalance));
      }
    };

    // Initial load
    updateBalance();

    // Listen for storage changes (cross-tab updates)
    window.addEventListener("storage", updateBalance);

    // Listen for custom events (same-tab updates)
    window.addEventListener("walletBalanceUpdated", updateBalance);

    return () => {
      window.removeEventListener("storage", updateBalance);
      window.removeEventListener("walletBalanceUpdated", updateBalance);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "bg-sky-500" : "";
  };

  return (
    <header className="bg-sky-400 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <img src="/logo.png" className="w-14" alt="Logo" />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <div className="flex items-center space-x-1 px-4 py-2 rounded-md bg-white text-gray-700 font-semibold">
            <Wallet2 size={18} />
            <span>₹{walletAmount.toFixed(2)}</span>
          </div>
          <Link
            to="/user/neworders"
            className={`font-semibold px-4 py-2 rounded-md ${isActive(
              "/user/neworders"
            )}`}
          >
            <ShoppingCart size={18} className="inline mr-1" />
            New Order
          </Link>
          <Link
            to="/user/orders"
            className={`font-semibold px-4 py-2 rounded-md ${isActive(
              "/user/orders"
            )}`}
          >
            <ListOrdered size={18} className="inline mr-1" />
            Orders
          </Link>
          <Link
            to="/user/addfund"
            className={`font-semibold px-4 py-2 rounded-md ${isActive(
              "/user/addfund"
            )}`}
          >
            <PlusCircle size={18} className="inline mr-1" />
            Add Fund
          </Link>
          <a
            href="https://t.me/mssonukr"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold px-4 py-2 rounded-md hover:bg-sky-500 transition"
          >
            <HelpCircle size={18} className="inline mr-1" />
            Help & Support
          </a>

          <button
            onClick={handleLogout}
            className="font-semibold px-4 py-2 rounded-md hover:bg-sky-500"
          >
            <LogOut size={18} className="inline mr-1" />
            Logout
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 pb-4 pt-2 space-y-3">
          <div className="flex items-center space-x-2 px-4 py-2 rounded-md bg-white text-gray-700 font-semibold">
            <Wallet2 size={18} />
            <span>₹{walletAmount.toFixed(2)}</span>
          </div>
          <Link
            to="/user/neworders"
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold ${isActive(
              "/user/neworders"
            )}`}
          >
            <ShoppingCart size={18} />
            <span>New Order</span>
          </Link>
          <Link
            to="/user/orders"
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold ${isActive(
              "/user/orders"
            )}`}
          >
            <ListOrdered size={18} />
            <span>Orders</span>
          </Link>
          <Link
            to="/user/addfund"
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-semibold ${isActive(
              "/user/addfund"
            )}`}
          >
            <PlusCircle size={18} />
            <span>Add Fund</span>
          </Link>
          <a
            href="https://t.me/mssonukr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 rounded-md font-semibold w-full text-left hover:bg-sky-500 transition"
          >
            <HelpCircle size={18} />
            <span>Help & Support</span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 rounded-md font-semibold w-full text-left hover:bg-sky-500"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Uheader;
