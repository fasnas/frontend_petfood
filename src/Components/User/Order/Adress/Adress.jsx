import React, { useState } from 'react';
import './Adress.css';
import { useNavigate } from 'react-router-dom';

const Address = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = 'Valid email is required';
        if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
            newErrors.phone = 'Valid 10-digit phone number is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.zip.trim() || !/^\d{5,6}$/.test(formData.zip))
            newErrors.zip = 'Valid 5 or 6 digit ZIP code is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            setSubmitted(true);
            console.log('Address Submitted:', formData);
            // Navigate to payment page if all details are valid
            navigate('/payment');
        }
    };

    return (
        <div className="address-container">
            <h2>Shipping Address</h2>
            <form className="address-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <p className="error-message">{errors.email}</p>}
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <p className="error-message">{errors.phone}</p>}
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? 'error' : ''}
                    ></textarea>
                    {errors.address && <p className="error-message">{errors.address}</p>}
                </div>

                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={errors.city ? 'error' : ''}
                    />
                    {errors.city && <p className="error-message">{errors.city}</p>}
                </div>

                <div className="form-group">
                    <label>State</label>
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className={errors.state ? 'error' : ''}
                    />
                    {errors.state && <p className="error-message">{errors.state}</p>}
                </div>

                <div className="form-group">
                    <label>ZIP Code</label>
                    <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        className={errors.zip ? 'error' : ''}
                    />
                    {errors.zip && <p className="error-message">{errors.zip}</p>}
                </div>

                <button type="submit" className="submit-btn">
                    Submit Address
                </button>
            </form>
            {submitted && <p className="success-message">Address submitted successfully!</p>}
        </div>
    );
};

export default Address;
