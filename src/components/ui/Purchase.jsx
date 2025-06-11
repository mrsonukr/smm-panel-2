import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import data from "./api.json"; // Import api.json
import Popup from "./Popup"; // Import the Popup component

const Product = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);
  const [quantity, setQuantity] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [showBalanceError, setShowBalanceError] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for Popup after successful submission
  const [userBalance, setUserBalance] = useState(0.00); // Hardcoded balance for testing
  const [popupKey, setPopupKey] = useState(0); // New state for forcing Popup remount

  // Set categories from api.json on mount
  useEffect(() => {
    setCategories(data.categories);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setShowBalanceError(false);
    setShowPopup(false); // Reset popup visibility

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

    if (parseFloat(totalCharge) > userBalance) {
      setShowBalanceError(true);
      setPopupKey((prev) => prev + 1); // Update key for balance error
      return;
    }

    // Simulate order submission
    try {
      const orderData = {
        categoryId: category._id || category.name,
        serviceName: service.name,
        quantity,
        link,
        totalCharge: parseFloat(totalCharge)
      };
      console.log("Order submitted:", orderData);
      alert("Order placed successfully");
      setUserBalance(userBalance - parseFloat(totalCharge)); // Deduct balance
      setShowPopup(true); // Show popup after successful submission
      setPopupKey((prev) => prev + 1); // Update key to force remount
      setQuantity("");
      setLink("");
    } catch (err) {
      console.error("Order submission error:", err);
      setError("Failed to place order");
    }
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
            Submit
          </button>

          {/* Errors */}
          {showBalanceError && (
            <div className="bg-red-100 text-red-500 p-3 rounded-md leading-relaxed">
              <p>Insufficient balance. Please add funds.</p>
            </div>
          )}
          {error && (
            <div className="bg-yellow-100 text-yellow-700 p-3 rounded-md leading-relaxed">
              <p>{error}</p>
            </div>
          )}
        </div>
      </form>

      {/* Render Popup after successful submission or balance error with unique key */}
      {(showPopup || showBalanceError) && <Popup userBalance={userBalance} key={popupKey} />}
    </div>
  );
};

export default Product;