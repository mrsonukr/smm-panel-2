import { useState, useEffect } from "react";
import { X, CheckCircle, Copy, ExternalLink } from "lucide-react";

const OrderSuccessPopup = ({ isVisible, onClose, orderData }) => {
  const [copied, setCopied] = useState(false);

  // Auto close popup after 10 seconds
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const handleCopyOrderId = () => {
    if (orderData?.orderId) {
      navigator.clipboard.writeText(orderData.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isVisible || !orderData) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl transform transition-all">
        {/* Header */}
        <div className="bg-green-500 text-white p-4 rounded-t-2xl relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:text-gray-200 transition"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="flex items-center justify-center">
            <CheckCircle className="w-8 h-8 mr-3" />
            <h2 className="text-xl font-bold">Your order received!</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Order ID */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-green-600 font-semibold text-lg">ID: </span>
                <span className="text-green-800 font-bold text-lg">{orderData.orderId}</span>
              </div>
              <button
                onClick={handleCopyOrderId}
                className="text-green-600 hover:text-green-800 transition"
                title="Copy Order ID"
              >
                {copied ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Category */}
          <div>
            <span className="text-green-600 font-semibold">Category: </span>
            <span className="text-green-800 font-medium">
              {orderData.categoryName}
              <span className="ml-2">😲😲😲</span>
            </span>
          </div>

          {/* Service */}
          <div>
            <span className="text-green-600 font-semibold">Service: </span>
            <span className="text-green-800 font-medium">
              {orderData.serviceName}
              <span className="ml-2">🚀</span>
            </span>
          </div>

          {/* Link */}
          <div>
            <span className="text-green-600 font-semibold">Link: </span>
            <div className="flex items-center mt-1">
              <span className="text-green-800 font-medium text-sm break-all mr-2">
                {orderData.link}
              </span>
              <button
                onClick={() => window.open(orderData.link, '_blank')}
                className="text-green-600 hover:text-green-800 transition flex-shrink-0"
                title="Open Link"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-sky-50 rounded-lg p-3">
              <div className="text-sky-600 font-semibold text-sm">Quantity</div>
              <div className="text-sky-800 font-bold text-lg">{orderData.quantity}</div>
            </div>
            <div className="bg-sky-50 rounded-lg p-3">
              <div className="text-sky-600 font-semibold text-sm">Total Cost</div>
              <div className="text-sky-800 font-bold text-lg">₹{orderData.totalCharge}</div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-yellow-800 font-semibold">Status: Processing</span>
            </div>
            <p className="text-yellow-700 text-sm mt-1">
              Your order is being processed and will start within 0-15 minutes.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg hover:bg-sky-700 transition"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPopup;