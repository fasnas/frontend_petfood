import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Products.css";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../Context/Context";

function Products() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
        setFilteredProducts(response.data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  
  const handleAddToCart = (product) => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      alert("Please log in to add items to your cart.");
      navigate("/login"); 
    } else {
      addToCart(product); 
    }
  };

  return (
    <div className="products-container">
      {/* Category Filter Buttons */}
      <div className="category-buttons">
        {["All", "Dog", "Cat"].map((category) => (
          <button
            key={category}
            className={`btn ${
              selectedCategory === category ? "btn-primary" : "btn-secondary"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.title} />
            <h4>{product.title}</h4>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
            <button className="btn btns" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
            <span>&nbsp;</span>
            <button
              className="btn btns"
              onClick={() => navigate(`/detail/${product.id}`)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
