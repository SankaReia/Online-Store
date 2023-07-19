import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import Counter from "../UI/Counter";
import { deleteFromBasket, fetchBasket } from "../http/basketApi";
import { useAppSelector } from "../hooks/redux";
import useAuth from "../hooks/useAuth";
import { PictureI } from "../utils/models";
import { pictureAPI } from "../services/PictureService";

interface BasketI {
  id: number;
  person_id: number;
  picture_id: number;
  quantity: number;
}

const Basket: FC = () => {
  const { isAuth } = useAuth();
  const userID = useAppSelector((state) => state.userReducer.id);
  const { data } = pictureAPI.useFetchAllPicturesQuery("");

  const [counter, setCounter] = useState<number>(1);
  const [basketArr, setBasketArr] = useState<PictureI[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, seTotalQuantity] = useState(0);

  const totalPriceAndQuantity = () => {
    let quantity = 0;
    let price = 0;

    for (let i = 0; i < basketArr.length; i++) {
      quantity += basketArr[i].quantity;
      price += basketArr[i].price * basketArr[i].quantity;
    }

    seTotalQuantity(quantity);
    setTotalPrice(price);
  };

  useEffect(() => {
    if (isAuth) {
      fetchBasket(userID).then((basket) => {
        const newArr = basket.map((el: BasketI) => {
          const newObj = data?.find((picture) => picture.id === el.picture_id);

          return { ...newObj, quantity: el.quantity };
        });
        setBasketArr(newArr);
      });
    }
    totalPriceAndQuantity();
  }, [userID, isAuth]);

  const deleteHandler = (picture_id: number) => {
    try {
      deleteFromBasket(picture_id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container sx={{ mt: 5 }}>
      <Grid item xs={8}>
        {basketArr.map((picture) => (
          <Card
            key={picture.id}
            sx={{
              position: "relative",
              mb: 5,
              maxWidth: "700px",
              borderRadius: "15px",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            }}
          >
            <Close
              sx={{ position: "absolute", right: 0, cursor: "pointer" }}
              onClick={() => deleteHandler(picture.id)}
            />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <ImageListItem>
                <img
                  src={process.env.REACT_APP_API_URL + picture.img}
                  alt="Product image"
                  style={{ width: "170px", height: "170px" }}
                />
              </ImageListItem>
              <Typography sx={{ fontSize: 22 }}>{picture.title}</Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Counter counter={picture.quantity} setCounter={setCounter} />
                <Typography sx={{ mt: 1, fontSize: 18, color: "dimgrey" }}>
                  {picture.price} $/pcs.
                </Typography>
              </Box>
              <Typography sx={{ fontSize: 22 }}>
                {picture.price * picture.quantity} $
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Grid>
      <Grid item xs={4}>
        <Card
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            borderRadius: "15px",
            maxWidth: "340px",
            boxShadow:
              "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            <span>QTY: {totalQuantity}</span>
            <span>{totalPrice} $</span>
          </CardContent>
          <CardActions>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                ":hover": {
                  color: "white",
                  background: "#1A1C29",
                  border: 3,
                },
                border: 3,
                fontSize: "18px",
                fontWeight: 600,
                borderRadius: 20,
              }}
            >
              checkout
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Basket;
