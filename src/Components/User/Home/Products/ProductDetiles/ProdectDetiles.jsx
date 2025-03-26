import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "./ProductDetiles.css"


function ProductDetails() {

    const { id } = useParams(); // Access the dynamic route parameter
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [id]);

    // Show a loading message while product data is being fetched
    if (!product) {
        return <p>Loading product details...</p>;
    }

    return (
        <div className="product-details-container">
            <img className="image"src={product.image}  />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Catagory: {product.category}</p>
            <p>Discount: {product.discount}</p>
            <p>Price: {product.price}</p>
            <p>Stock: {product.stock}</p>

        </div>
    );
}

export default ProductDetails;


  