import React, { useContext } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/Context";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p>Price: ₹{item.price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, false)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, true)}>+</button>
                </div>
                <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
                <button className="remove" onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="cart-summary">
          <h4>Total Amount: ₹{totalAmount.toFixed(2)}</h4>
          <button onClick={clearCart}>Clear Cart</button>
          <button onClick={() => navigate("/adrs")}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
