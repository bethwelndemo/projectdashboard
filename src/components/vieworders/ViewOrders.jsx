import React, { useState } from 'react';// Ensure axiosInstance is imported
import './vieworders.css'; // Ensure this CSS file has the updated styles
import Layout from '../layout/Layout';
import axiosInstance from '../../helpers/axiosInstanceToken';
import CheckSession from '../../helpers/CheckSession';


const ViewOrders = () => {
  const {access_token } = CheckSession();
  const [orderId, setOrderId] = useState('');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await axiosInstance.get('/get-all-orders', {
        // No need to pass `order_id` here if we want to fetch all orders
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}` // Example token
        }
      });
      console.log(orders)
  
      console.log(response.data); // Log the API response to check its structure
      setOrders(response.data);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  return (
    <div className="view-orders-container">
        <Layout/>
      <h1>View Orders</h1>
      <form onSubmit={handleSubmit} className="view-orders-form">
        <button type="submit" className="submit-button">Fetch Orders</button>
      </form>

      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}

      {orders.length > 0 && (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.order_id} className="order-item">
              <h2>Order ID: {order.order_id}</h2>
              <p><strong>User ID:</strong> {order.user_id}</p>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item-details">
                    <p><strong>Shoe ID:</strong> {item.shoe_id}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrders;
