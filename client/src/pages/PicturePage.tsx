import { ArrowRightAlt } from "@mui/icons-material";
import { Button, Box, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Counter from "../UI/Counter";
import { useAppSelector } from "../hooks/redux";
import { pictureAPI } from "../services/PictureService";
import Loader from "../UI/Loader";
import { basketAPI } from "../services/BasketService";
import MySnackbar from "../UI/MySnackbar";

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
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { id } = useParams();
  const userID = useAppSelector((state) => state.userReducer.id);
  const [addToBasket, {}] = basketAPI.useAddToBasketMutation();
  const { data: basket } = basketAPI.useFetchBasketQuery(userID);
  const { data: picture } = pictureAPI.useFetchOnePictureQuery(id as string);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [counter, setCounter] = useState(1);
  const [isInBasket, setIsInBasket] = useState(false);

  useEffect(() => {
    if (id) {
      const result = basket?.find((picture) => picture.picture_id === +id);
      if (result !== undefined) {
        setIsInBasket(true);
      }
    }
  }, [basket]);

  const addToBasketHandler = async () => {
    if (!isAuth) return setOpenSnackbar(true);
    try {
      if (id) {
        await addToBasket({
          person_id: userID,
          picture_id: +id,
          quantity: counter,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {picture ? (
        <Box>
          <Typography variant="h4" component="h2" sx={{ textAlign: "center" }}>
            {picture.title}
          </Typography>
          <Grid container sx={{ mt: 5 }}>
            <Grid item xs={6}>
              <img
                src={process.env.REACT_APP_API_URL + picture.img}
                style={{ maxWidth: "500px", maxHeight: "360px" }}
                alt="product image"
              />
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
                {!isInBasket ? (
                  <>
                    <Counter counter={counter} setCounter={setCounter} />
                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: "30px",
                        padding: "15px 20px",
                        background: "black",
                      }}
                      onClick={addToBasketHandler}
                    >
                      Add to cart
                      <ArrowRightAlt />
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: "30px",
                      padding: "15px 20px",
                      background: "black",
                    }}
                    onClick={() => navigate("/basket")}
                  >
                    In The Cart
                    <ArrowRightAlt />
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>

          <MySnackbar
            openSnackbar={openSnackbar}
            message={"You are not logged in"}
            type={"warning"}
            setOpenSnackbar={setOpenSnackbar}
          />
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PicturePage;
