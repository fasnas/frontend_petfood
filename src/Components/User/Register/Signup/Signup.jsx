import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
  
    // Check if the email is already registered
    try {
      const emailCheckResponse = await axios.get(`http://localhost:3000/users?email=${email}`);
      
      if (emailCheckResponse.data.length > 0) {
        alert('This email is already registered. Please use a different email.');
        return;
      }
  
      // If the email is not found, proceed with registration
      const userData = {
        name,
        email,
        password,
        cart: [],
        orders: []
      };
  
      // Create the new user
      const response = await axios.post('http://localhost:3000/users', userData);
      console.log('User registered successfully:', response.data);
      alert('Registration successful! Please login.');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register. Please try again.');
    }
  };
  
  return (
    <div className="container">
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Create an Account</h2>

          
          <label htmlFor="name" className="label">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Full Name"
            required
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)} 
          />

          <label htmlFor="email" className="label">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="Email Address"
            required
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />

          <label htmlFor="password" className="label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            required
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />

          <label htmlFor="confirm-password" className="label">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            required
            className="input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          
          <button
            type="submit"
            className="button button-primary"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;



