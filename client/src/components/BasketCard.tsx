import { FC, useState } from "react";
import { PictureI } from "../utils/models";
import {
  Box,
  Card,
  CardContent,
  ImageListItem,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import Counter from "../UI/Counter";
import { basketAPI } from "../services/BasketService";

interface BasketCardProp {
  picture: PictureI;
  userID: number;
}

const BasketCard: FC<BasketCardProp> = ({ picture, userID }) => {
  const [deleteFromBasket, {}] = basketAPI.useDeleteFromBasketMutation();
  const [updateBasket, {}] = basketAPI.useUpdateBasketMutation();
  const [counter, setCounter] = useState<number>(1);

  const deleteHandler = async (picture_id: number) => {
    try {
      await deleteFromBasket(picture_id);
    } catch (error) {
      console.log(error);
    }
  };

  const updateHandler = async (picture_id: number) => {
    try {
      await updateBasket({
        person_id: userID,
        picture_id: picture_id,
        quantity: counter,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          <Counter
            counter={picture.quantity}
            setCounter={setCounter}
            changeHandler={updateHandler}
            x={picture.id}
          />
          <Typography sx={{ mt: 1, fontSize: 18, color: "dimgrey" }}>
            {picture.price} $/pcs.
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 22 }}>
          {picture.price * picture.quantity} $
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BasketCard;
