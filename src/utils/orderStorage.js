// Order storage utility functions
export const saveOrder = (orderData) => {
  const existingOrders = getOrders();
  const newOrder = {
    ...orderData,
    status: 'Processing',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  const updatedOrders = [newOrder, ...existingOrders];
  localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
  
  // Trigger custom event for real-time updates
  window.dispatchEvent(new CustomEvent('ordersUpdated'));
  
  return newOrder;
};

export const getOrders = () => {
  const orders = localStorage.getItem('userOrders');
  return orders ? JSON.parse(orders) : [];
};

export const updateOrderStatus = (orderId, status) => {
  const orders = getOrders();
  const updatedOrders = orders.map(order => 
    order.orderId === orderId 
      ? { ...order, status, updatedAt: new Date().toISOString() }
      : order
  );
  
  localStorage.setItem('userOrders', JSON.stringify(updatedOrders));
  
  // Trigger custom event for real-time updates
  window.dispatchEvent(new CustomEvent('ordersUpdated'));
  
  return updatedOrders;
};

export const getOrderById = (orderId) => {
  const orders = getOrders();
  return orders.find(order => order.orderId === orderId);
};

// Simulate order processing (10-20 seconds delay)
export const simulateOrderProcessing = (orderId) => {
  const delay = Math.random() * 10000 + 10000; // 10-20 seconds
  
  setTimeout(() => {
    updateOrderStatus(orderId, 'Completed');
  }, delay);
};