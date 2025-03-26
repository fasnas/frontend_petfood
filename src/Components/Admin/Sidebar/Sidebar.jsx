import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css"; 
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate()

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3  text-white x" style={{ width: "210px", height: "100vh" }}>
      <a className="d-flex align-items-left mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4">Admin Menu</span>
      </a>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <a onClick={() => navigate("/ahome")} className="nav-link text-white" aria-current="page">
            <i className="bi bi-house-door-fill me-2"></i> Dashboard
          </a>
        </li>
        <li>
          <a onClick={() => navigate("ausers")} className="nav-link text-white">
            <i className="bi bi-people-fill me-2"></i> Users
          </a>
        </li>
        <li>
          <a onClick={() => navigate("aproducts")} className="nav-link text-white">
            <i className="bi bi-box-seam me-2"></i> Products
          </a>
        </li>
        <li>
          <a onClick={()=>navigate('revenue')} className="nav-link text-white">
            <i className="bi bi-bar-chart-line"></i>  Report
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
