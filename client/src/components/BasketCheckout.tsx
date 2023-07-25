import { Button, Card, CardActions, CardContent } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useTotalQuantity } from "../hooks/useTotalQuantity";
import { PictureI } from "../utils/models";

interface BasketCheckoutProp {
  basket: PictureI[];
}

const BasketCheckout: FC<BasketCheckoutProp> = ({ basket }) => {
  const navigate = useNavigate();
  const { totalQuantity, totalPrice } = useTotalQuantity(basket);

  return (
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
          onClick={() => navigate("/checkout")}
        >
          checkout
        </Button>
      </CardActions>
    </Card>
  );
};

export default BasketCheckout;
