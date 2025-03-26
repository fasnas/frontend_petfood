import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const admContext = createContext();

const AdminContext = ({ children }) => {
  const [product, setProduct] = useState([]);
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

useEffect(()=>{
  const fetchUsers=async()=>{
    try{
      const response=await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch(error){
      console.log(error)
    }
  };
  fetchUsers();

},[])

  const addProduct = async (newProduct) => {
    try {
      const response = await axios.post("http://localhost:3000/products", newProduct);
      setProduct((prevProducts) => [...prevProducts, response.data]);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <admContext.Provider
      value={{
        product,
        setProduct,
        addProduct,
        users,
        setUsers
      }}
    >
      {children}
    </admContext.Provider>
  );
};

export default AdminContext;
