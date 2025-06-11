import { Clock } from "lucide-react";
const PayInfo = () => {
  return (
    <div className="font-semibold text-slate-800 ">
      <h3 className="text-xl">Instruction</h3>
      <ul className="list-decimal pl-5 space-y-2 mt-4">
        <li>
          Please enter an amount above ₹50 and then click "Pay Now".{" "}
          <span className="text-green-600">(Min 50Rs)</span>
        </li>
        <li>Scan QR Code and Pay</li>
        <li>Enter the 12 Digits UTR ID Above the Instruction.</li>
      </ul>
      <iframe
        width="100%"
        height="400px"
        src="https://www.youtube.com/embed/xzGGxNgmkIw?si=-HkelSdnz0KJQEBg"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="rounded-2xl overflow-hidden mt-4"
      />
      <div className="flex items-start gap-3 mt-4 bg-sky-50 text-sky-800 border border-sky-200 rounded-xl p-4">
        <Clock className="w-5 h-5 mt-1 text-sky-500" />
        <div className="text-sm leading-relaxed">
          Funds will be added automatically in <strong>1–4 minutes</strong>.
        </div>
      </div>
    </div>
  );
};

export default PayInfo;
