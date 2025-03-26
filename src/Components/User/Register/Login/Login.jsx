import React, { useState, useContext } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../Context/Context';

const LoginPage = () => {
  const { setCart } = useContext(CartContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Check for admin credentials
    if (email === 'admin@gmail.com' && password === 'admin') {
      localStorage.setItem('id', 'admin');
      localStorage.setItem('username', 'Admin');
      alert('Admin login successful!');
      navigate('/ahome'); // Navigate to /ahome if it's admin
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/users');
      const users = response.data;

      const matchedUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        if (matchedUser.blocked) {
          alert('Your account is blocked. Please contact support.');
          return; // Don't proceed with the login if the user is blocked
        }

        localStorage.setItem('id', matchedUser.id);
        localStorage.setItem('username', matchedUser.name);

        // Fetch the cart data of the logged-in user
        const cartResponse = await axios.get(
          `http://localhost:3000/users/${matchedUser.id}`
        );

        // Set the cart data in context using setCart
        setCart(cartResponse.data.cart || []);  // If no cart data, set empty array
        
        alert('Login successful!');
        navigate('/'); // Navigate to homepage for normal users
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleLogin}>
          <h2 className="title">Login</h2>

          <label htmlFor="email" className="label">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            required
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="button button-primary">
            Login
          </button>
        </form>

        <p className="text">Don't have an account?</p>
        <button
          onClick={() => navigate('/create')}
          className="button button-secondary"
        >
          Create an Account
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
