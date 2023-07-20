import { AppBar, Box, Typography, Button, Tooltip } from "@mui/material";
import {
  Login,
  Logout,
  ShoppingBasketSharp,
  AdminPanelSettingsSharp,
} from "@mui/icons-material";
import { categories } from "../utils/categories";
import { useAppDispatch } from "../hooks/redux";
import { useNavigate, useLocation } from "react-router-dom";
import { PublicConsts, AdminConsts } from "../utils/routsConsts";
import { FC } from "react";
import useAuth from "../hooks/useAuth";
import { removeUser } from "../store/slices/userSlice";

const NavBar: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuth, isAdmin } = useAuth();

  const logoutHandler = () => {
    dispatch(removeUser());
    navigate(PublicConsts.HOME_ROUTE);
    localStorage.removeItem("token");
  };

  return (
    <AppBar sx={{ position: "static", height: 120 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ cursor: "pointer", textAlign: "center", lineHeight: "170%" }}
        onClick={() => {
          navigate(PublicConsts.HOME_ROUTE);
        }}
      >
        Company Name
      </Typography>
      <div style={{ height: "1px", background: "white" }}></div>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        {categories.map(({ title, route }) => (
          <Button
            key={route}
            style={{
              color: "white",
              height: "30px",
              fontSize: 17,
              borderBottom:
                location.pathname === route ? "1px solid white" : "",
            }}
            onClick={() => navigate(route)}
          >
            {title}
          </Button>
        ))}
        {isAuth ? (
          <div>
            {isAdmin && (
              <Tooltip title="admin" arrow>
                <AdminPanelSettingsSharp
                  sx={{ mx: 0.5 }}
                  onClick={() => navigate(AdminConsts.PICTURE_ARRAY_ROUTE)}
                />
              </Tooltip>
            )}

            <Tooltip title="basket" arrow>
              <ShoppingBasketSharp
                sx={{ mx: 0.5 }}
                onClick={() => navigate(PublicConsts.BASKET_ROUTE)}
              />
            </Tooltip>
            <Tooltip title="logout" arrow>
              <Logout sx={{ mx: 0.5 }} onClick={logoutHandler} />
            </Tooltip>
          </div>
        ) : (
          <Tooltip title="login" arrow>
            <Login onClick={() => navigate(PublicConsts.LOGIN_ROUTE)} />
          </Tooltip>
        )}
      </Box>
    </AppBar>
  );
};

export default NavBar;
