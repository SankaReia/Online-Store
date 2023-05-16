import React, { FC, useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PublicConsts } from "../utils/routsConsts";
import { login, register } from "../http/userAPI";
import { useAppDispatch } from "../hooks/redux";
import { UserI, setUser } from "../store/slices/userSlice";

const Auth: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isLogin = location.pathname === PublicConsts.LOGIN_ROUTE;
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      let data: UserI;

      if (isLogin) {
        data = (await login(form.email, form.password)) as UserI;
      } else {
        data = (await register(form.email, form.password)) as UserI;
      }

      dispatch(setUser({ id: data.id, email: data.email, role: data.role }));
      navigate("/");
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "#1A1C29" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {isLogin ? "Sign in" : "Sign up"}
      </Typography>
      <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          id="email"
          name="email"
          onChange={inputChangeHandler}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          id="password"
          name="password"
          type="password"
          onChange={inputChangeHandler}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </Button>

        <Grid container>
          <Grid item>
            {isLogin ? (
              <Link to={PublicConsts.REGISTER_ROUTE}>
                Don't have an account? Sign Up
              </Link>
            ) : (
              <Link to={PublicConsts.LOGIN_ROUTE}>
                Already have an account? Sign in
              </Link>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Auth;
