import React, { useState, useContext, useEffect } from 'react';
import { admContext } from '../AdminContext/AdminContext';
import axios from 'axios';
import './AdminProduct.css';

const AdminProduct = () => {
  const { product, setProduct } = useContext(admContext);
  
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    image: '',
    name: '',
    description: '',
    color: '',
    discount: 0,
    stock: 0,
    price: 0,
    category: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProduct = () => {
    setEditMode(false);
    setFormData({
      id: '',
      title: '',
      image: '',
      name: '',
      description: '',
      color: '',
      discount: 0,
      stock: 0,
      price: 0,
      category: '',
    });
    setShowModal(true);
  };

  const handleEdit = (id) => {
    const selectedProduct = product.find((item) => item.id === id);
    setFormData(selectedProduct);
    setCurrentProductId(id);
    setEditMode(true);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateProductData = () => {
    const requiredFields = ['name', 'price', 'category'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`${field} is required.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateProductData()) {
      const dataToSubmit = {
        ...formData,
        discount: Number(formData.discount), 
        stock: Number(formData.stock),       
        price: Number(formData.price),       
      };
  
      if (!dataToSubmit.id) {
        delete dataToSubmit.id;
      }
  
      setIsSubmitting(true);
      setFormData(dataToSubmit); 
    }
  };
  

  useEffect(() => {
    const submitProduct = async () => {
      if (isSubmitting) {
        try {
          if (editMode) {
            const response = await axios.patch(
              `http://localhost:3000/products/${currentProductId}`,
              formData
            );

            if (response.status >= 200 && response.status < 300) {
              setProduct(
                product.map((item) =>
                  item.id === currentProductId ? { ...formData } : item
                )
              );
              alert('Product updated successfully');
            } else {
              throw new Error('Failed to update product.');
            }
          } else {
            const response = await axios.post('http://localhost:3000/products', formData);

            if (response.status >= 200 && response.status < 300) {
              setProduct([...product, { ...formData }]);
              alert('Product added successfully');
            } else {
              throw new Error('Failed to add product.');
            }
          }

          setShowModal(false);
        } catch (error) {
          console.error('Error saving product:', error);
          alert(`Failed to save product: ${error.message || error}`);
        } finally {
          setIsSubmitting(false);
        }
      }
    };

    submitProduct();
  }, [isSubmitting, formData, editMode, product, setProduct, currentProductId]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await axios.delete(`http://localhost:3000/products/${id}`);
        if (response.status >= 200 && response.status < 300) {
          setProduct(product.filter((item) => item.id !== id));
          alert('Product deleted successfully');
        } else {
          throw new Error('Failed to delete product.');
        }
      } catch (error) {
        console.error('Error deleting product:', error);
        alert(`Failed to delete product: ${error.message || error}`);
      }
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal') {
      setShowModal(false);
    }
  };

  return (
    <div className="product-container">
      <div className="header">
        <h2 className="page-title">Product List</h2>
        <button className="add-product-btn" onClick={handleAddProduct}>
          Add Product
        </button>
      </div>

      {showModal && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <h3>{editMode ? 'Edit Product' : 'Add New Product'}</h3>
            <table className="modal-table">
              <tbody>
                <tr>
                  <td>Product ID</td>
                  <td>
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      disabled={editMode} // Disable this field in edit mode
                    />
                  </td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Image URL</td>
                  <td>
                    <input
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Product Name</td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Color</td>
                  <td>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td>
                    <input
                      type="number"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Stock</td>
                  <td>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Price</td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="modal-actions">
              <button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="product-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Image</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item, index) => (
              <tr key={item.id || index}>
                <td>{index + 1}</td>
                <td>{item.name || 'N/A'}</td>
                <td>
                  {item.image ? (
                    <img src={item.image} alt={item.name || 'No Name'} className="product-image" />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>{item.category || 'N/A'}</td>
                <td>${item.price && typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}</td>
                <td>
                  <button className="action-btn edit-btn" onClick={() => handleEdit(item.id)}>
                    Edit
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminProduct;
