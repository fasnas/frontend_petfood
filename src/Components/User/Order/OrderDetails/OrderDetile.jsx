import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import "./OrderDetile.css"; 

const ViewOrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserOrders = async () => {
      const userId = localStorage.getItem("id");
      if (!userId) {
        alert("Please log in to view your orders.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
        const userData = response.data;

        if (userData && userData.orders) {
          setOrders(userData.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("Error fetching user orders:", err);
        setError("Failed to load orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="order-details-container">
      <div className="top-right">
        <button
          className="btn btn-primary home-button"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      <h1 className="order-header">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <h4 className="order-title">Order #{index + 1}</h4>
              <div className="order-details">
                <img
                  src={order.image}
                  alt={order.title}
                  className="order-image"
                />
                <div className="order-info">
                  <h5 className="product-name">{order.name}</h5>
                  <p className="product-price">Price: ₹{order.price}</p>
                  <p className="product-quantity">Quantity: {order.quantity}</p>
                  <p className="product-total">
                    Total: ₹{(order.price * order.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrderDetails;