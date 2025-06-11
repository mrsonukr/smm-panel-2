import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PayInfo from "./PayInfo";
import TransactionTable from "./TransactionTable";

export default function PaymentForm() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({ name: "", amount: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
      setErrors((prev) => ({ ...prev, amount: "" })); // Clear amount error on valid input
    }
  };

  const handleSuggestedAmount = (suggestedAmount) => {
    setAmount(suggestedAmount.toString());
    setErrors((prev) => ({ ...prev, amount: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = { name: "", amount: "" };
    let valid = true;

    if (!name) {
      newErrors.name = "Name is required";
      valid = false;
    }

    const parsedAmount = parseInt(amount, 10);
    if (!amount || parsedAmount < 50 || parsedAmount > 2500) {
      newErrors.amount = "Amount must be between ₹50 and ₹2500";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      setIsLoading(true);
      // Redirect to /user/payprocess/:amount
      navigate(`/user/payprocess/${amount}`);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-sky-400 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 shadow-md space-y-4 mx-auto"
      >
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors((prev) => ({ ...prev, name: "" })); // Clear name error on input
            }}
            className="w-full p-2 rounded-md bg-sky-100 text-black focus:outline-none disabled:opacity-50"
            placeholder="Enter your name"
            disabled={isLoading}
          />
          {errors.name && (
            <p
              className="text-yellow-700 bg-yellow-100 p-3 rounded-md mt-1 text-sm"
              aria-live="polite"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label className="block font-semibold mb-1">Amount</label>
          <div className="flex items-center bg-sky-100 rounded-md">
            <span className="px-3 text-gray-500">₹</span>
            <input
              type="text"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 bg-transparent text-black focus:outline-none disabled:opacity-50"
              placeholder="Enter amount (50 - 2500)"
              disabled={isLoading}
            />
          </div>
          {errors.amount && (
            <p
              className="text-yellow-700 bg-yellow-100 p-3 rounded-md mt-1 text-sm"
              aria-live="polite"
            >
              {errors.amount}
            </p>
          )}
        </div>

        {/* Suggested Amounts */}
        <div className="flex justify-center gap-4">
          {[50, 250, 500, 1000].map((suggestedAmount) => (
            <button
              key={suggestedAmount}
              type="button"
              onClick={() => handleSuggestedAmount(suggestedAmount)}
              className="px-4 py-2 bg-cyan-100 text-cyan-600 font-semibold rounded-lg hover:bg-cyan-200 transition disabled:opacity-50"
              disabled={isLoading}
            >
              ₹{suggestedAmount}
            </button>
          ))}
        </div>

        <button
          type="submit"
          className={`w-full bg-cyan-600 text-white font-semibold py-2 rounded-md hover:bg-cyan-700 transition ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Proceed to Pay"}
        </button>
        <PayInfo />
      </form>
      <TransactionTable />
    </div>
  );
}
