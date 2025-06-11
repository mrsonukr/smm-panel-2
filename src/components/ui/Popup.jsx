import { useState } from "react";
import { X, AlertTriangle, CreditCard } from "lucide-react"; // Importing the 'X' icon for close button and 'AlertTriangle' for warning
import { Link } from "react-router-dom"; // Importing Link for navigation
const Popup = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Function to close the popup
  const closePopup = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed inset-0 bg-slate-800 bg-opacity-50 flex justify-center items-center z-50 px-4 ">
          {/* Popup Card Container */}
          <div className="bg-slate-800 border-2 border-orange-600 text-white p-6 rounded-lg max-w-lg w-full relative">
            {/* Close Button */}
            <button
              id="popupCloseButton"
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={closePopup}
            >
              <X /> {/* Using LucidReact's 'X' icon for the close button */}
            </button>

            {/* Warning Icon */}
            <div className="text-4xl text-center">
              <AlertTriangle className="text-orange-600 mx-auto" />
            </div>

            {/* Title */}
            <h3 className="text-2xl text-orange-600 font-bold text-center mt-4">
              Insufficient Balance
            </h3>

            {/* Balance Message */}
            <p className="text-lg mt-2 text-center">
              Your balance is currently{" "}
              <strong className="text-red-600">₹0</strong>.
            </p>

            {/* Additional Info */}
            <p className="text-sm mt-2 text-center text-gray-400">
              आपके पास पर्याप्त शेष नहीं है। कृपया पहले फंड जोड़ें।
            </p>

            {/* Add Funds Button */}
            <Link
              to="/user/addfund"
              className="mt-4 text-white bg-orange-600 hover:bg-orange-700 py-2 px-4 rounded-lg mx-auto block text-center"
            >
              <CreditCard className="inline mr-2" /> Add Funds / फंड जोड़ें
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
