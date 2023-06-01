import { Add, ArrowRightAlt, Remove } from "@mui/icons-material";
import {
  Button,
  Box,
  Fab,
  Grid,
  ImageListItem,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PictureI } from "../store/slices/pictureSlice";
import { fetchOnePicture } from "../http/pictureApi";
import useAuth from "../hooks/useAuth";

const priceStyle = {
  background: "black",
  borderRadius: "20px",
  fontSize: 24,
  color: "white",
  display: "inline-block",
  p: "8px 20px",
  mb: 2,
};

const counterStyle = {
  width: "56px",
  height: "56px",
  lineHeight: "50px",
  fontSize: "24px",
  textAlign: "center",
  border: "3px solid #000",
  borderLeft: "none",
  borderRight: "none",
};

const PicturePage: FC = () => {
  const { id } = useParams();
  const { isAuth } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [counter, setCounter] = useState<number>(1);
  const [picture, setPicture] = useState<PictureI>();

  useEffect(() => {
    if (id) {
      fetchOnePicture(id).then(([picture]) => setPicture(picture));
    }
  }, []);

  if (!picture) {
    return <div>Loading</div>;
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: "center", mt: 5, mb: 5 }}
      >
        {picture.title}
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <ImageListItem>
            <img
              src={process.env.REACT_APP_API_URL + picture.img}
              style={{ width: "500px", height: "360px" }}
              alt="product image"
            />
          </ImageListItem>
        </Grid>

        <Grid item xs={6}>
          <Typography sx={priceStyle}>{picture.price} $</Typography>
          <Typography sx={{ fontSize: 18, color: "gray" }}>
            {picture.description}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              marginTop: "30px",
            }}
          >
            <div style={{ display: "flex" }}>
              <Fab
                sx={{
                  bgcolor: "white",
                  border: "3px solid black",
                  borderRadius: "50% 0 0 50%",
                }}
                onClick={() => setCounter((prev) => (prev > 1 ? prev - 1 : 1))}
              >
                <Remove />
              </Fab>

              <Box sx={counterStyle}>{counter}</Box>
              <Fab
                sx={{
                  bgcolor: "white",
                  border: "3px solid black",
                  borderRadius: "0 50% 50% 0",
                }}
                onClick={() =>
                  setCounter((prev) => (prev < 10 ? prev + 1 : 10))
                }
              >
                <Add />
              </Fab>
            </div>
            <Button
              variant="contained"
              sx={{
                borderRadius: "30px",
                padding: "15px 20px",
                background: "black",
              }}
              onClick={() => !isAuth && setOpenSnackbar(true)}
            >
              Add to cart
              <ArrowRightAlt />
            </Button>
          </div>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
          You are not logged in!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PicturePage;
