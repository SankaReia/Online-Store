import { Box, Typography, Container, Link } from "@mui/material";
import { FC } from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2">
      {"Copyright © "}
      <Link color="secondary" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LayOut: FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <NavBar />

      <Container component="main" sx={{ mt: 5 }}>
        <Outlet />
      </Container>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "#1A1C29",
          color: "white",
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">Company Name</Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
};

export default LayOut;
