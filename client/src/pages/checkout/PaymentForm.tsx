import React, { FC } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { PaymentI } from "../../utils/models";

interface PaymentFormProp {
  isFilledIn: boolean;
  setIsFilledIn: React.Dispatch<React.SetStateAction<boolean>>;
  payment: PaymentI;
  setPayment: React.Dispatch<React.SetStateAction<PaymentI>>;
}

const PaymentForm: FC<PaymentFormProp> = ({
  payment,
  setPayment,
  isFilledIn,
  setIsFilledIn,
}) => {
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayment({ ...payment, [event.target.id]: event.target.value });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            variant="standard"
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            variant="standard"
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            variant="standard"
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            variant="standard"
            onChange={inputChangeHandler}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PaymentForm;
