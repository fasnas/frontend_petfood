import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/Context'; 
import './Navbar.css';

const Navbar = () => {
  const [username, setUsername] = useState(null); 
  const [cartCount, setCartCount] = useState(0); 
  const { cart,setCart } = useContext(CartContext); 
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');

    if (loggedInUser) {
      setUsername(loggedInUser); 
    }
  }, [navigate]);

  
  useEffect(() => {
    const totalUniqueItems = cart.length; 
    setCartCount(totalUniqueItems);
  },[cart]); 


  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    setCart([]);
    setUsername(null);
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white position-sticky top-0 shadow-sm">
        <div className="container-fluid">
          {/* Brand Name */}
          <a
            className="navbar-brand text-dark"
            href="/"
            style={{ fontSize: '24px', fontWeight: 'bold' ,color:'black'}}
          >
            The Pet Pantry
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {username ? (
                <li className="nav-item d-none d-lg-block">
                  <h6 className="text-muted me-4" style={{ cursor: 'default' }}>
                    Hi, {username}
                  </h6>
                </li>
              ) : (
                <li className="nav-item d-none d-lg-block">
                  <h6
                    className="text-muted me-4 cursor-pointer"
                    onClick={() => navigate('/login')}
                  >
                    Please login
                  </h6>
                </li>
              )}

              {/* Home Link */}
              <li className="nav-item">
                <a className="nav-link text-dark" href="/">
                  Home
                </a>
              </li>

              {/* Cart Link with Cart Icon */}
              <li className="nav-item">
                <button
                  className="btn btn-light d-flex align-items-center"
                  onClick={() => navigate('/cart')}
                >
                  <i
                    className="bi bi-cart me-2"
                    style={{ fontSize: '20px' }}
                  ></i>
                  Cart ({cartCount}) {/* Display unique cart item count */}
                </button>
              </li>

              {/* Login or Logout Button */}
              <li className="nav-item">
                {username ? (
                  <button
                    className="btn btn-danger ms-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <button
                    className="btn btn-primary ms-3"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;
