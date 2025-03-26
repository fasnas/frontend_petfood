import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Payment.css";
import { CartContext } from "../../Context/Context";

const PaymentComponent = () => {
  const { cart, setCart } = useContext(CartContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const user = response.data;

      // Update the server's orders array with current cart items
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        orders: [...(user.orders || []), ...cart],
        cart: [], 
      });

      // Clear the local cart context
      setCart([]);

    
      alert("Payment successful! Your order has been placed.");
      navigate("/view");
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Failed to complete the payment. Please try again.");
    }
  };

  return (
    <div className="payment-container">
      <h2 className="payment-header">Choose Payment Method</h2>
      <form className="payment-form" onSubmit={handlePaymentSubmit}>
        <div className="payment-methods">
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Credit/Debit Card"
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <span>Credit/Debit Card</span>
          </label>
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="UPI"
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <span>UPI</span>
          </label>
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Net Banking"
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <span>Net Banking</span>
          </label>
          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Cash on Delivery"
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            />
            <span>Cash on Delivery</span>
          </label>
        </div>
        <button className="payment-btn" type="submit">
          Proceed to Pay
        </button>
      </form>
    </div>
  );
};

export default PaymentComponent;
