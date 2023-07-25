import { Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import useAuth from "../hooks/useAuth";
import { BasketI, PictureI } from "../utils/models";
import { pictureAPI } from "../services/PictureService";
import { basketAPI } from "../services/BasketService";
import Loader from "../UI/Loader";
import BasketCard from "../components/BasketCard";
import BasketCheckout from "../components/BasketCheckout";

const Basket: FC = () => {
  const { isAuth } = useAuth();
  const userID = useAppSelector((state) => state.userReducer.id);
  const { data: pictures } = pictureAPI.useFetchAllPicturesQuery("");
  const { data, isLoading } = basketAPI.useFetchBasketQuery(userID);

  const [basket, setBasket] = useState<PictureI[]>([]);

  useEffect(() => {
    if (isAuth && data) {
      const basketArr = data.map((el: BasketI) => {
        const newObj = pictures?.find(
          (picture) => picture.id === el.picture_id
        );
        return { ...newObj, quantity: el.quantity };
      });
      setBasket(basketArr as PictureI[]);
    }
  }, [data]);

  return (
    <Grid container sx={{ mt: 5 }}>
      <Grid item xs={8}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {basket.map((picture) => (
              <BasketCard picture={picture} userID={userID} key={picture.id} />
            ))}
          </>
        )}
      </Grid>
      <Grid item xs={4}>
        <BasketCheckout basket={basket} />
      </Grid>
    </Grid>
  );
};

export default Basket;
