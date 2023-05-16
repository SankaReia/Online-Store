import { Paper, useTheme } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminConsts } from "../../utils/routsConsts";
import "./AdminNav.scss";

type arrType = {
  route: string;
  title: string;
};

const arr: arrType[] = [
  {
    route: AdminConsts.ADD_PICTURE_ROUTE,
    title: "Add picture",
  },
  {
    route: AdminConsts.PICTURE_ARRAY_ROUTE,
    title: "List of products",
  },
];
const AdminNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Paper elevation={3} className="AdminNav">
      {arr.map(({ title, route }: arrType) => (
        <div key={route}>
          <div
            style={{
              transition: "0.3s",
              color:
                route === location.pathname ? theme.palette.primary.main : "",
            }}
            onClick={() => navigate(route)}
          >
            {title}
          </div>
          <div
            style={{
              transition: "0.3s",
              borderBottom:
                route === location.pathname
                  ? `1px solid ${theme.palette.primary.main}`
                  : "1px solid gray",
            }}
          />
        </div>
      ))}
    </Paper>
  );
};

export default AdminNav;
