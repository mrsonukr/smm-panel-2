import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { ArrowLeft } from "lucide-react";
import RazorpayLogo from "./Razorpaylogo";

const UPI_ID = "insta999guru@ibl";

export default function Qrcode() {
  const { amount } = useParams(); // Extract amount from URL parameter
  const [utr, setUtr] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [validatedAmount, setValidatedAmount] = useState("");
  const navigate = useNavigate();

  // Validate amount from URL parameter
  useEffect(() => {
    if (amount && /^\d+$/.test(amount)) {
      const parsedAmount = parseInt(amount, 10);
      if (parsedAmount >= 50) {
        setValidatedAmount(amount);
      } else {
        setAmountError("Amount must be at least ₹50");
      }
    } else {
      setAmountError("Invalid or missing amount in URL");
    }
  }, [amount]);

  // Razorpay-style UPI payment link with validated amount
  const paymentLink = `upi://pay?pa=${UPI_ID}&pn=Instawala&am=${validatedAmount}&cu=INR&tn=ORD4575224455`;

  const handleUtrChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input and enforce 12-digit limit
    if (/^\d{0,12}$/.test(value)) {
      setUtr(value);
      setError(""); // Clear error on valid input change
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation: Check for exactly 12 digits
    if (!/^\d{12}$/.test(utr)) {
      setError("Please enter a valid 12-digit UTR number");
      return;
    }

    // Simulate Razorpay payment verification (placeholder for actual API call)
    setIsLoading(true);
    try {
      // TODO: Replace with actual Razorpay API call to verify UTR
      console.log("Verifying payment with UTR:", utr);
      // Simulate failed verification for demo
      throw new Error("UTR does not match");
    } catch (err) {
      console.error("Verification error:", err);
      setError("UTR does not match, invalid"); // Update with actual API error handling
    } finally {
      setIsLoading(false);
      setUtr(""); // Clear input after submission
    }
  };

  const handleBack = () => {
    // Navigate to the payment page
    navigate("/user/addfund");
  };

  // If there's an amount error or amount is not validated, show error page
  if (amountError || !validatedAmount) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full space-y-6 relative">
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 text-gray-600 hover:text-blue-600 transition focus:outline-none"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex justify-center mb-4">
            <RazorpayLogo />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-800">Error</h2>
            <p
              className="text-red-600 bg-red-50 p-2 rounded-md mt-2 text-sm"
              aria-live="polite"
            >
              {amountError || "Loading amount..."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // QR Code Page
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full space-y-6 relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-600 hover:text-blue-600 transition focus:outline-none"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Razorpay Branding */}
        <div className="flex justify-center mb-4">
          <RazorpayLogo />
        </div>

        {/* QR Code Section */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-800">
            Scan to Pay ₹{validatedAmount}
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Use any UPI app to scan and pay
          </p>
          <div className="flex justify-center bg-blue-50 p-6 rounded-lg">
            <QRCode
              value={paymentLink}
              size={180}
              bgColor="#F0F5FF" // Razorpay-like light blue
              fgColor="#000000"
              level="H"
            />
          </div>
        </div>

        {/* UTR Input Section */}
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter UTR Number
            </label>
            <input
              type="text"
              value={utr}
              onChange={handleUtrChange}
              className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              placeholder="12-digit UTR number"
              disabled={isLoading}
              maxLength={12} // Restrict input length
            />
            {error && (
              <p
                className="text-red-600 bg-red-50 p-2 rounded-md mt-2 text-sm"
                aria-live="polite"
              >
                {error}
              </p>
            )}
          </div>

          {/* Verify Payment Button */}
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white mt-3 font-semibold py-3 rounded-lg hover:bg-blue-700 transition ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Payment"}
          </button>
        </form>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-4">
          Powered by{" "}
          <span className="font-semibold text-blue-600">Razorpay</span>
        </p>
      </div>
    </div>
  );
}
