import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../Footer/Footer';
import Products from '../Products/Product/Products';
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div
        className="container-fluid p-0"
        style={{
          backgroundImage: 'url(https://allgoodpetfood.co.nz/cdn/shop/files/banner-01a_3ffa77aa-9a7d-4047-81c1-eb2530ebbbb9.jpg?v=1694778423)',
          backgroundSize: 'cover', // Ensures responsiveness
          backgroundPosition: 'center',
          height: '570px'
        }}
      >
      </div>
      <Products />
      <Footer />
    </div>
  );
};

export default Banner;
