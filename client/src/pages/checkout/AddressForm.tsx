import React, { FC } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { AddressI } from "../../utils/models";
import MySnackbar from "../../UI/MySnackbar";

interface AddressFormProp {
  isFilledIn: boolean;
  setIsFilledIn: React.Dispatch<React.SetStateAction<boolean>>;
  address: AddressI;
  setAddress: React.Dispatch<React.SetStateAction<AddressI>>;
}

const AddressForm: FC<AddressFormProp> = ({
  isFilledIn,
  setIsFilledIn,
  address,
  setAddress,
}) => {
  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [event.target.id]: event.target.value });
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            label="First name"
            fullWidth
            variant="standard"
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            label="Last name"
            fullWidth
            variant="standard"
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            label="Address line"
            fullWidth
            variant="standard"
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            label="City"
            fullWidth
            variant="standard"
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="state"
            label="State/Province/Region"
            fullWidth
            variant="standard"
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            label="Zip / Postal code"
            fullWidth
            variant="standard"
            onChange={inputChangeHandler}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            label="Country"
            fullWidth
            variant="standard"
            onChange={inputChangeHandler}
          />
        </Grid>
      </Grid>

      <MySnackbar
        openSnackbar={!isFilledIn}
        message={"Not everything is filled in"}
        type={"warning"}
        setOpenSnackbar={setIsFilledIn}
      />
    </>
  );
};

export default AddressForm;
