import { ArrowRightAlt } from "@mui/icons-material";
import {
  Button,
  Box,
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
import Counter from "../UI/Counter";
import { useAppSelector } from "../hooks/redux";
import { addToCart } from "../http/basketApi";

const priceStyle = {
  background: "black",
  borderRadius: "20px",
  fontSize: 24,
  color: "white",
  display: "inline-block",
  p: "8px 20px",
  mb: 2,
};

const PicturePage: FC = () => {
  const userID = useAppSelector((state) => state.userReducer.id);
  const { id } = useParams();
  const { isAuth } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [counter, setCounter] = useState<number>(1);
  const [picture, setPicture] = useState<PictureI>();

  useEffect(() => {
    if (id) {
      fetchOnePicture(id).then(([picture]) => setPicture(picture));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const addToCartHandler = () => {
    if (!isAuth) return setOpenSnackbar(true);

    try {
      if (id) addToCart(userID, id, counter);
    } catch (error) {
      console.log(error);
    }
  };

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
      <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
        {picture.title}
      </Typography>
      <Grid container sx={{ mt: 5 }}>
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
            <Counter counter={counter} setCounter={setCounter} />
            <Button
              variant="contained"
              sx={{
                borderRadius: "30px",
                padding: "15px 20px",
                background: "black",
              }}
              onClick={addToCartHandler}
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
