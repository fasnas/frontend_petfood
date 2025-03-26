import React, { useEffect, useState } from 'react';
import './Revenue.css'; 

const RevenueReport = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const orders = data
          .flatMap(user => user.orders || [])
          .map(order => ({
            name: order.name,
            price: order.price,
            quantity: order.quantity,
          }));

        setSalesData(orders);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalQuantity = salesData.reduce((sum, item) => sum + item.quantity, 0);
  const totalRevenue = salesData.reduce((sum, item) => sum + item.quantity * item.price, 0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="revenue-report">
      <h1>Revenue Report</h1>
      <table className="revenue-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price ($)</th>
            <th>Quantity Sold</th>
            <th>Revenue ($)</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>{(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="bold">Total</td>
            <td></td>
            <td className="bold">{totalQuantity}</td>
            <td className="bold">{totalRevenue.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default RevenueReport;
