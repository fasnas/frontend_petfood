import React from 'react';
import './Footer.css'; // Import CSS for custom styling

function Footer() {
  return (
    <footer className=" samp footer mt-auto py-3 bg-white text-black">
      <hr />
      <div className=" sample container">
        <div className="row">
          {/* Column 1 */}
          <div className="col-md-4">
            <h5>About Us</h5>
            <p>
              We offer the best pet products at affordable prices. Your pet’s happiness is our priority!
            </p>
          </div>
          {/* Column 2 */}
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#home" className="text-black">Home</a></li>
              <li><a href="#products" className="text-black">Products</a></li>
              <li><a href="#contact" className="text-black">Contact Us</a></li>
              <li><a href="#faq" className="text-black">FAQ</a></li>
            </ul>
          </div>
          {/* Column 3 */}
          <div className="col-md-4">
            <h5>Contact Us</h5>
            <p>Email: support@petshop.com</p>
            <p>Phone: +1 234 567 890</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-black me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-black me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-black">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col text-center">
            <p className="mb-0">&copy; 2024 PetShop. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
