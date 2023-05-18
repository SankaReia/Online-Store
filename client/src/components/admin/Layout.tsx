import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";

const Layout: React.FC = () => {
  return (
    <div style={{ display: "flex", marginTop: "15px" }}>
      <AdminNav />
      <div style={{ height: "fit-content", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
