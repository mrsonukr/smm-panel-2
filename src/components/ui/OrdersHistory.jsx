import React from "react";
import { Search } from "lucide-react";

const OrdersHistory = () => {
  const tabs = ["All", "Pending", "In progress", "Completed", "Partial", "Processing", "Canceled"];

  return (
    <div className="p-4 bg-sky-400 min-h-screen">
      <div className="bg-white rounded-xl p-6 shadow-md space-y-4 mx-auto">
        {/* Tabs */}
        <div>
          <ul className="flex flex-wrap gap-2">
            {tabs.map((tab, index) => (
              <li key={tab}>
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    index === 0
                      ? "bg-cyan-600 text-white"
                      : "bg-cyan-100 text-cyan-600 hover:bg-cyan-200"
                  }`}
                >
                  {tab}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Search */}
        <div>
          <form className="flex">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-l-md bg-sky-100 text-black focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-r-md hover:bg-cyan-700"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-sky-100 text-black">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Link</th>
                <th className="px-4 py-2">Charge</th>
                <th className="px-4 py-2">Start Count</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Service</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Remains</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="9" className="text-center px-4 py-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination (optional placeholder) */}
        <div className="text-sm text-gray-500">
          {/* Pagination logic here */}
        </div>
      </div>
    </div>
  );
};

export default OrdersHistory;