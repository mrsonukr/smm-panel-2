import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { ArrowLeft, UploadCloud } from "lucide-react";

const BharatPeQR = () => {
  const upiUrl = "upi://pay?pa=merchant@upi&pn=MerchantName&am=150&cu=INR";
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180 seconds
  const [view, setView] = useState("qr"); // qr, details, processing, failed
  const [utr, setUtr] = useState("");
  const [utrError, setUtrError] = useState(""); // For UTR validation error
  const [imageError, setImageError] = useState(""); // For image validation error
  const [dots, setDots] = useState("."); // For loading animation in processing view

  // Timer for QR code validity
  useEffect(() => {
    if (view === "qr") {
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [view]);

  // Loading dots animation for processing view
  useEffect(() => {
    if (view === "processing") {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : "."));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [view]);

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(1, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const validateUtr = (utr) => {
    const utrRegex = /^\d{12}$/;
    return utrRegex.test(utr);
  };

  const validateImage = (file) => {
    const validTypes = ["image/jpeg", "image/png"];
    return file && validTypes.includes(file.type);
  };

  const handleUpdatePaymentClick = () => {
    setView("details");
    setUtrError("");
    setImageError("");
  };

  const handleBackClick = () => {
    setView("qr");
    setTimeLeft(180); // Reset timer when returning to QR code
    setUtr("");
    setUtrError("");
    setImageError("");
  };

  const handleSubmit = () => {
    if (!utr.trim()) {
      setUtrError("Please enter a UTR number.");
      return;
    }
    if (!validateUtr(utr)) {
      setUtrError("Please enter the correct UTR number.");
      return;
    }

    setView("processing");
    setUtrError("");
    setUtr("");

    // Simulate UTR verification (replace with actual API call)
    setTimeout(() => {
      // For demo, assume "123456789012" is the only valid UTR
      if (utr === "123456789012") {
        alert("Payment processed successfully!");
        setView("qr");
        setTimeLeft(180);
      } else {
        setView("failed");
        setImageError(""); // Clear image error for UTR failure
      }
    }, 3000);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageError("Please select a file to upload.");
      return;
    }
    if (!validateImage(file)) {
      setImageError("Please upload a valid image (JPEG or PNG).");
      return;
    }

    setView("processing");
    setImageError("");
    setUtrError("");

    // Simulate image verification (replace with actual API call)
    setTimeout(() => {
      // For demo, assume only files named "valid_screenshot.jpg" are valid
      if (file.name === "valid_screenshot.jpg") {
        alert(`Payment processed successfully for ${file.name}!`);
        setView("qr");
        setTimeLeft(180);
      } else {
        setView("failed");
        setUtrError(""); // Clear UTR error for image failure
      }
    }, 3000);
  };

  const handleTryAgain = () => {
    setView("details");
    setUtr("");
    setUtrError("");
    setImageError("");
  };

  return (
    <div className="bg-sky-100 h-screen flex items-center justify-center overflow-hidden p-4">
      <div className="max-w-[300px] w-full shadow-md bg-white space-y-4 rounded-md">
        {/* Header (consistent across all views) */}
        <div className="bg-neutral-700 p-4 text-white rounded-t-md">
          <h2 className="text-xl font-semibold">BharatPe Merchant</h2>
          <p className="text-neutral-300 text-sm">Scan to pay ₹150</p>
        </div>

        {view === "qr" ? (
          // QR Code View
          <>
            <div className="bg-white p-4 flex justify-center">
              <QRCode value={upiUrl} size={220} />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-blue-700 text-white py-2 px-3 text-sm rounded-md"
                onClick={handleUpdatePaymentClick}
              >
                Update Payment Details
              </button>
            </div>
            <p className="text-center text-sm">
              Valid until{" "}
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </p>
            <div className="bg-neutral-700 p-4 text-white rounded-b-md">
              <p className="text-neutral-300 text-sm">
                Step 1. After successful payment, click on the "Update Payment
                Details" button above to complete the transaction.
              </p>
            </div>
          </>
        ) : view === "details" ? (
          // Payment Details View
          <>
            <div className="p-4 space-y-4">
              <button
                className="flex items-center text-blue-600 text-sm font-medium hover:underline"
                onClick={handleBackClick}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to QR Code
              </button>
              <div>
                <label className="text-sm text-gray-700 font-medium mb-1 block">
                  UTR Number
                </label>
                <input
                  type="text"
                  value={utr}
                  onChange={(e) => {
                    setUtr(e.target.value);
                    setUtrError(""); // Clear error on input change
                  }}
                  placeholder="Enter 12-digit UTR Number"
                  className={`w-full border ${
                    utrError ? "border-red-500" : "border-gray-300"
                  } rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {utrError && (
                  <p className="text-red-500 text-xs mt-1">{utrError}</p>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-blue-700 text-white py-2 px-3 text-sm rounded-md"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
              <div className="flex items-center justify-center">
                <hr className="flex-grow border-gray-300" />
                <span className="px-2 text-sm text-gray-500">OR</span>
                <hr className="flex-grow border-gray-300" />
              </div>
              <label className={`block border-2 border-dashed ${
                imageError ? "border-red-500" : "border-blue-500"
              } text-center py-6 rounded-md cursor-pointer hover:bg-blue-50 transition text-blue-600`}>
                <div className="flex flex-col items-center justify-center space-y-2">
                  <UploadCloud className="w-8 h-8" />
                  <span className="font-semibold">Upload Screenshot</span>
                  <span className="text-sm text-blue-400">
                    Drag and drop or click to upload (JPEG/PNG)
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png"
                    onChange={handleFileUpload}
                  />
                </div>
              </label>
              {imageError && (
                <p className="text-red-500 text-xs mt-1">{imageError}</p>
              )}
            </div>
          </>
        ) : view === "processing" ? (
          // Processing Payment View
          <>
            <div className="p-4 flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-700"></div>
              <p className="text-gray-700 text-sm font-medium">
                Processing Payment{dots}
              </p>
              <p className="text-gray-500 text-sm text-center">
                Please wait while we verify your payment. This may take a few
                moments.
              </p>
            </div>
            <div className="bg-neutral-700 p-4 text-white rounded-b-md">
              <p className="text-neutral-300 text-sm">
                Do not refresh or leave this page until the process is complete.
              </p>
            </div>
          </>
        ) : (
          // Payment Failed View
          <>
            <div className="p-4 flex flex-col items-center space-y-4">
              <div className="rounded-full h-12 w-12 bg-red-100 flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <p className="text-gray-700 text-sm font-medium">
                Payment Failed
              </p>
              <p className="text-gray-500 text-sm text-center">
                {utrError
                  ? "The UTR number provided does not match our records. Please try again with a valid UTR."
                  : "The uploaded screenshot could not be verified. Please try again with a valid screenshot."}
              </p>
              <button
                className="bg-blue-700 text-white py-2 px-3 text-sm rounded-md"
                onClick={handleTryAgain}
              >
                Try Again
              </button>
            </div>
            <div className="bg-neutral-700 p-4 text-white rounded-b-md">
              <p className="text-neutral-300 text-sm">
                If the issue persists, contact support at support@bharatpe.com.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BharatPeQR;