import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        const usersResponse = await axios.get("http://localhost:3000/users");
        const users = usersResponse.data;

        const productsResponse = await axios.get("http://localhost:3000/products");
        const products = productsResponse.data;

        let totalUsers = 0;
        let totalOrders = 0;
        let totalProducts = 0;
        let totalBlockedUsers = 0;

        users.forEach((user) => {
          totalUsers += 1;

          if (user.blocked) {
            totalBlockedUsers += 1;
          }

          if (Array.isArray(user.orders)) {
            user.orders.forEach((order) => {
              totalOrders += order.quantity || 0; 
            });
          }
        });

        totalProducts = products.length;

        const categories = new Set(products.map((product) => product.category));
        const totalCategories = categories.size;

        const fetchedData = [
          { id: 1, title: "Total Users", value: totalUsers },
          { id: 2, title: "Total Products", value: totalProducts },
          { id: 3, title: "Total Orders", value: totalOrders },
          { id: 4, title: "Total Categories", value: totalCategories },
          { id: 5, title: "Total Blocked Users", value: totalBlockedUsers }, 
        ];

        setDashboardData(fetchedData);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return <div className="dashboard-loading">Loading Dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      <div className="dashboard-grid">
        {dashboardData.map((item) => (
          <div key={item.id} className="dashboard-card">
            <h3>{item.title}</h3>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
