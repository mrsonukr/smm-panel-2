import { useState, useEffect } from "react";
import { Wallet, Plus, History } from "lucide-react";

const WalletManager = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [addAmount, setAddAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load wallet balance from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem("walletBalance");
    if (savedBalance) {
      setWalletBalance(parseFloat(savedBalance));
    }
  }, []);

  // Save wallet balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("walletBalance", walletBalance.toString());
  }, [walletBalance]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAddAmount(value);
      setError("");
    }
  };

  const handleAddFunds = () => {
    setError("");
    setSuccess("");

    const amount = parseFloat(addAmount);
    
    if (!addAmount || amount <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    if (amount < 1) {
      setError("Minimum amount is ₹1");
      return;
    }

    if (amount > 50000) {
      setError("Maximum amount is ₹50,000");
      return;
    }

    // Add amount to wallet
    const newBalance = walletBalance + amount;
    setWalletBalance(newBalance);
    setSuccess(`₹${amount} added successfully to your wallet!`);
    setAddAmount("");

    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccess("");
    }, 3000);
  };

  const suggestedAmounts = [100, 500, 1000, 2000, 5000];

  return (
    <div className="p-4 bg-sky-400 min-h-screen">
      <div className="bg-white rounded-xl p-6 shadow-md space-y-6 mx-auto max-w-md">
        {/* Wallet Balance Display */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Wallet className="w-8 h-8 text-sky-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Wallet Balance</h2>
          </div>
          <div className="bg-sky-50 rounded-lg p-4 border-2 border-sky-200">
            <span className="text-3xl font-bold text-sky-600">₹{walletBalance.toFixed(2)}</span>
          </div>
        </div>

        {/* Add Funds Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Add Funds
          </h3>

          {/* Amount Input */}
          <div>
            <label className="block font-medium mb-2 text-gray-700">Enter Amount</label>
            <div className="flex items-center bg-sky-100 rounded-md">
              <span className="px-3 text-gray-600 font-medium">₹</span>
              <input
                type="text"
                value={addAmount}
                onChange={handleAmountChange}
                className="w-full p-3 bg-transparent text-gray-800 focus:outline-none"
                placeholder="Enter amount to add"
              />
            </div>
          </div>

          {/* Suggested Amounts */}
          <div>
            <label className="block font-medium mb-2 text-gray-700">Quick Add</label>
            <div className="grid grid-cols-3 gap-2">
              {suggestedAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setAddAmount(amount.toString());
                    setError("");
                  }}
                  className={`px-3 py-2 rounded-lg font-medium transition ${
                    addAmount === amount.toString()
                      ? "bg-sky-600 text-white"
                      : "bg-sky-100 text-sky-600 hover:bg-sky-200"
                  }`}
                >
                  ₹{amount}
                </button>
              ))}
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={handleAddFunds}
            className="w-full bg-sky-600 text-white font-semibold py-3 rounded-lg hover:bg-sky-700 transition flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add to Wallet
          </button>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              <p className="text-sm font-medium">{success}</p>
            </div>
          )}
        </div>

        {/* Transaction History Note */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <div className="flex items-center text-gray-600">
            <History className="w-5 h-5 mr-2" />
            <span className="text-sm">
              This is a demo wallet. Funds are stored locally in your browser.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletManager;