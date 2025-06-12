import React from 'react';
import BharatPeQR from '../components/ui/BharatPeQR';

const Api = () => {
    return (
        <div>
            <BharatPeQR/>
        </div>
//         import React, { useEffect, useState } from "react";
// import QRCode from "react-qr-code";

// const BharatPeQR = () => {
//   const upiUrl = "upi://pay?pa=merchant@upi&pn=MerchantName&am=150&cu=INR";
//   const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180 seconds

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = (seconds) => {
//     const m = String(Math.floor(seconds / 60)).padStart(1, "0");
//     const s = String(seconds % 60).padStart(2, "0");
//     return `${m}:${s}`;
//   };

//   return (
//     <div className="bg-sky-100 h-screen flex items-center justify-center overflow-hidden p-4">
//       <div className="max-w-[300px] w-full shadow-md bg-white space-y-4 rounded-md">
//         <div className="bg-neutral-700 p-4 text-white rounded-t-md">
//           <h2 className="text-xl font-semibold">BharatPe Merchant</h2>
//           <p className="text-neutral-300 text-sm">Scan to pay ₹150</p>
//         </div>

//         <div className="bg-white p-4 flex justify-center">
//           <QRCode value={upiUrl} size={220} />
//         </div>

//         <div className="flex justify-center">
//           <button className="bg-blue-700 text-white py-2 px-3 text-sm rounded-md">
//             Update Payment Details
//           </button>
//         </div>

//         <p className="text-center text-sm">
//           Valid until{" "}
//           <span className="font-semibold">{formatTime(timeLeft)}</span>
//         </p>

//         <div className="bg-neutral-700 p-4 text-white rounded-b-md">
//           <p className="text-neutral-300 text-sm">
//             Step 1. After successful payment, click on the "Update Payment
//             Details" button above to complete the transaction.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BharatPeQR;

    );
}

export default Api;
