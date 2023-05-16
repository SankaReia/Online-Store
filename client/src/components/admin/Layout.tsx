import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";

const Layout: React.FC = () => {
  return (
    <div>
      <AdminNav />
      <div style={{ height: "fit-content", width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
