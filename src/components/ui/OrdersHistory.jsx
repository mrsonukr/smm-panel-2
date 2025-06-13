import React, { useState, useEffect } from "react";
import { Search, ExternalLink, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { getOrders } from "../../utils/orderStorage";

const OrdersHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = ["All", "Processing", "Completed", "Pending", "In progress", "Partial", "Canceled"];

  // Load orders on component mount
  useEffect(() => {
    const loadOrders = () => {
      const userOrders = getOrders();
      setOrders(userOrders);
      setFilteredOrders(userOrders);
    };

    loadOrders();

    // Listen for order updates
    const handleOrdersUpdate = () => {
      loadOrders();
    };

    window.addEventListener('ordersUpdated', handleOrdersUpdate);

    return () => {
      window.removeEventListener('ordersUpdated', handleOrdersUpdate);
    };
  }, []);

  // Filter orders based on active tab and search term
  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (activeTab !== "All") {
      filtered = filtered.filter(order => order.status === activeTab);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.link.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  }, [orders, activeTab, searchTerm]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Pending':
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'Completed':
        return 'text-green-600 bg-green-100';
      case 'Pending':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const truncateLink = (link, maxLength = 30) => {
    if (link.length <= maxLength) return link;
    return link.substring(0, maxLength) + '...';
  };

  return (
    <div className="p-4 bg-sky-400 min-h-screen">
      <div className="bg-white rounded-xl p-6 shadow-md space-y-4 mx-auto">
        {/* Tabs */}
        <div>
          <ul className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <li key={tab}>
                <button
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    activeTab === tab
                      ? "bg-cyan-600 text-white"
                      : "bg-cyan-100 text-cyan-600 hover:bg-cyan-200"
                  }`}
                >
                  {tab}
                  {tab !== "All" && (
                    <span className="ml-1 text-xs">
                      ({orders.filter(order => order.status === tab).length})
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Search */}
        <div>
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              placeholder="Search by Order ID, Service, or Link"
              className="w-full px-4 py-2 rounded-l-md bg-sky-100 text-black focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-cyan-600 text-white rounded-r-md hover:bg-cyan-700 transition"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Orders Summary */}
        <div className="bg-sky-50 rounded-lg p-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-sky-600">{orders.length}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {orders.filter(order => order.status === 'Processing').length}
              </div>
              <div className="text-sm text-gray-600">Processing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(order => order.status === 'Completed').length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-sky-600">
                ₹{orders.reduce((total, order) => total + parseFloat(order.totalCharge), 0).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">Total Spent</div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-sky-100 text-black">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Link</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Charge</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center px-4 py-8 text-gray-500">
                    {searchTerm ? "No orders found matching your search." : "No orders found."}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.orderId} className="border-t hover:bg-sky-50 transition">
                    <td className="px-4 py-3 font-medium text-blue-600">
                      #{order.orderId}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-xs">
                        <div className="font-medium text-gray-800 truncate">
                          {order.serviceName}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {order.categoryName}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-600 truncate max-w-xs">
                          {truncateLink(order.link)}
                        </span>
                        <button
                          onClick={() => window.open(order.link, '_blank')}
                          className="text-blue-500 hover:text-blue-700 transition"
                          title="Open Link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {order.quantity.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-medium text-green-600">
                      ₹{order.totalCharge}
                    </td>
                    <td className="px-4 py-3">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span>{order.status}</span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination info */}
        {filteredOrders.length > 0 && (
          <div className="text-sm text-gray-500 text-center">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersHistory;