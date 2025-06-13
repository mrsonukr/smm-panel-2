import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import data from "./api.json"; // Import api.json
import OrderSuccessPopup from "./OrderSuccessPopup"; // Import the new popup

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [userBalance, setUserBalance] = useState(0.00);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [orderData, setOrderData] = useState(null);

  // Set categories from api.json on mount
  useEffect(() => {
    setCategories(data.categories);
  }, []);

  // Load wallet balance from localStorage
  useEffect(() => {
    const savedBalance = localStorage.getItem("walletBalance");
    if (savedBalance) {
      setUserBalance(parseFloat(savedBalance));
    }
  }, []);

  // Update balance when localStorage changes (for real-time updates)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedBalance = localStorage.getItem("walletBalance");
      if (savedBalance) {
        setUserBalance(parseFloat(savedBalance));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events for same-tab updates
    const handleBalanceUpdate = () => {
      const savedBalance = localStorage.getItem("walletBalance");
      if (savedBalance) {
        setUserBalance(parseFloat(savedBalance));
      }
    };

    window.addEventListener('walletBalanceUpdated', handleBalanceUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('walletBalanceUpdated', handleBalanceUpdate);
    };
  }, []);

  // Ensure a category is selected
  const category = categories[selectedCategoryIndex] || { services: [], description: [] };
  const service = category.services[selectedServiceIndex] || { quantity_range: { min: 1, max: 1000 }, charge_per_unit: 0 };

  const handleCategoryChange = (e) => {
    setSelectedCategoryIndex(e.target.value);
    setSelectedServiceIndex(0);
    setQuantity("");
  };

  const handleServiceChange = (e) => {
    setSelectedServiceIndex(e.target.value);
    setQuantity("");
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value);
    setQuantity(qty > 0 ? qty : "");
  };

  const totalCharge =
    quantity && service.charge_per_unit
      ? (quantity * service.charge_per_unit).toFixed(2)
      : "";

  const generateOrderId = () => {
    return Math.floor(10000 + Math.random() * 90000).toString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!link.trim()) {
      setError("Link is required.");
      return;
    }

    if (!quantity || quantity < service.quantity_range.min || quantity > service.quantity_range.max) {
      setError(
        `Quantity must be between ${service.quantity_range.min} and ${service.quantity_range.max}.`
      );
      return;
    }

    const totalCost = parseFloat(totalCharge);

    if (totalCost > userBalance) {
      setError("Insufficient balance. Please add funds to your wallet.");
      return;
    }

    // Create order data
    const newOrderData = {
      orderId: generateOrderId(),
      categoryName: category.name,
      serviceName: service.name,
      quantity: quantity,
      link: link.trim(),
      totalCharge: totalCost.toFixed(2),
      timestamp: new Date().toISOString()
    };

    // Deduct balance and update localStorage
    const newBalance = userBalance - totalCost;
    setUserBalance(newBalance);
    localStorage.setItem("walletBalance", newBalance.toString());
    
    // Trigger custom event for balance update
    window.dispatchEvent(new Event('walletBalanceUpdated'));

    // Show success popup
    setOrderData(newOrderData);
    setShowSuccessPopup(true);

    // Reset form
    setQuantity("");
    setLink("");
    setError("");
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    setOrderData(null);
  };

  return (
    <div className="p-4 bg-sky-400 min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
          {/* Category */}
          <div className="relative">
            <label className="block font-semibold mb-1">Category</label>
            <select
              className="w-full p-2 rounded-md bg-sky-100 appearance-none focus:outline-none"
              value={selectedCategoryIndex}
              onChange={handleCategoryChange}
            >
              {categories.map((cat, index) => (
                <option value={index} key={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-9 text-gray-500">
              <ChevronDown size={18} />
            </div>
          </div>

          {/* Service */}
          <div className="relative">
            <label className="block font-semibold mb-1">Service</label>
            <select
              className="w-full p-2 rounded-md bg-sky-100 appearance-none focus:outline-none"
              value={selectedServiceIndex}
              onChange={handleServiceChange}
            >
              {category.services.map((srv, index) => (
                <option value={index} key={srv.name}>
                  {srv.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-9 text-gray-500">
              <ChevronDown size={18} />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <div className="bg-sky-100 p-3 rounded-md text-sm leading-relaxed space-y-1">
              {category.description.map((line, idx) => (
                <p key={idx}>{line}</p>
              ))}
            </div>
          </div>

          {/* Link */}
          <div>
            <label className="block font-semibold mb-1">Link</label>
            <input
              type="text"
              placeholder="Enter the link"
              className="w-full p-2 rounded-md bg-sky-100 focus:outline-none"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block font-semibold mb-1">Quantity</label>
            <input
              type="number"
              placeholder="Enter quantity"
              className="w-full p-2 rounded-md bg-sky-100 focus:outline-none"
              value={quantity}
              min={service.quantity_range.min}
              max={service.quantity_range.max}
              onChange={handleQuantityChange}
            />
            <small className="text-gray-500">
              Min: {service.quantity_range.min}, Max: {service.quantity_range.max}
            </small>
          </div>

          {/* Charge */}
          <div>
            <label className="block font-semibold mb-1">Charge</label>
            <div className="flex items-center bg-sky-100 rounded">
              <span className="px-3">₹</span>
              <input
                type="text"
                className="w-full p-2 bg-transparent focus:outline-none"
                value={totalCharge}
                readOnly
              />
            </div>
          </div>

          {/* Balance */}
          <div>
            <label className="block font-semibold mb-1">Your Balance</label>
            <div className="flex items-center bg-sky-100 rounded">
              <span className="px-3">₹</span>
              <input
                type="text"
                className="w-full p-2 bg-transparent focus:outline-none"
                value={userBalance.toFixed(2)}
                readOnly
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white font-semibold py-2 rounded-md hover:bg-cyan-700 transition"
          >
            Submit Order
          </button>

          {/* Errors */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-md">
              <p className="font-medium">{error}</p>
            </div>
          )}
        </div>
      </form>

      {/* Order Success Popup */}
      <OrderSuccessPopup
        isVisible={showSuccessPopup}
        onClose={handleClosePopup}
        orderData={orderData}
      />
    </div>
  );
};

export default Product;