import React from "react";
import AdminNavbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <AdminNavbar />
      <div className="layout-body">
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </div>
    
    </div>
  );
};

export default Layout;
