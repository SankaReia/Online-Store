import { Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { FC } from "react";
import { AddressI, PaymentI } from "../../utils/models";

const products = [
  {
    name: "Product 1",
    desc: "1",
    price: "$9.99",
  },
  {
    name: "Product 2",
    desc: "1",
    price: "$3.45",
  },
  {
    name: "Product 3",
    desc: "3",
    price: "$6.51",
  },
];

interface ReviewProp {
  address: AddressI;
  payment: PaymentI;
}

const Review: FC<ReviewProp> = ({ address, payment }) => {
  const addressStr = `${address.address}, ${address.city}, ${address.zip}, ${address.country}`;

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} />
            <ListItemText
              primary={product.price}
              secondary={`Кол-во: ${product.desc}`}
            />
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            $34.06
          </Typography>
        </ListItem>
      </List>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {address.firstName} {address.lastName}
          </Typography>
          <Typography gutterBottom>{addressStr}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            <Typography gutterBottom>
              Card holder: {payment.cardName}
            </Typography>
            <Typography gutterBottom>
              Card number: {payment.cardNumber}
            </Typography>
            <Typography gutterBottom>Expiry date: {payment.expDate}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
