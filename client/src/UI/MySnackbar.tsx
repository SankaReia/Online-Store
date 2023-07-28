import React, { FC } from "react";
import { Alert, AlertColor, Snackbar } from "@mui/material";

interface MySnackbarProp {
  openSnackbar: boolean;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  type: AlertColor;
}

const MySnackbar: FC<MySnackbarProp> = ({
  openSnackbar,
  setOpenSnackbar,
  message,
  type,
}) => {
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(!openSnackbar);
  };

  return (
    <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}!
      </Alert>
    </Snackbar>
  );
};

export default MySnackbar;
