import { Banknote, CalendarDays, Hash } from "lucide-react";

const transactions = []; // Empty array to simulate no transactions

export default function TransactionTable() {
  return (
    <div className="overflow-hidden bg-white mt-8 p-4 rounded-lg">
      <table className="min-w-full text-sm text-gray-800">
        <thead className="text-left">
          <tr>
            <th className="px-4 py-3">
              <div className="flex items-center gap-1 transition-all duration-300 hover:text-gray-600">
                <Hash className="w-4 h-4" />
                <span>ID</span>
              </div>
            </th>
            <th className="px-4 py-3">
              <div className="flex items-center gap-1 transition-all duration-300 hover:text-gray-600">
                <CalendarDays className="w-4 h-4" />
                <span>Date</span>
              </div>
            </th>
            <th className="px-4 py-3">
              <div className="flex items-center gap-1 transition-all duration-300 hover:text-gray-600">
                <Banknote className="w-4 h-4" />
                <span>Method</span>
              </div>
            </th>
            <th className="px-4 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 py-8">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((txn, idx) => (
              <tr
                key={idx}
                className="border-t hover:bg-gray-50 transition-all duration-300"
              >
                <td className="px-4 py-3">{txn.id}</td>
                <td className="px-4 py-3">{txn.date}</td>
                <td className="px-4 py-3">{txn.method}</td>
                <td className="px-4 py-3 text-right font-semibold text-green-600">
                  ₹{txn.amount}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
