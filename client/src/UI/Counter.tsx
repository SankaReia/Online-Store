import { Box, Fab } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import React, { FC } from "react";

const counterStyle = {
  width: "48px",
  height: "48px",
  lineHeight: "45px",
  fontSize: "22px",
  textAlign: "center",
  border: "3px solid #000",
  borderLeft: "none",
  borderRight: "none",
};

interface CounterProp {
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  counter: number;
  changeHandler?: (x: any) => void;
  x?: number;
}

const Counter: FC<CounterProp> = ({
  counter,
  setCounter,
  changeHandler,
  x,
}) => {
  return (
    <Box style={{ display: "flex" }}>
      <Fab
        size="medium"
        sx={{
          bgcolor: "white",
          border: "3px solid black",
          borderRadius: "50% 0 0 50%",
        }}
        onClick={() => {
          setCounter((prev) => (prev > 1 ? prev - 1 : 1));
          changeHandler?.(x);
        }}
      >
        <Remove />
      </Fab>

      <Box sx={counterStyle}>{counter}</Box>
      <Fab
        size="medium"
        sx={{
          bgcolor: "white",
          border: "3px solid black",
          borderRadius: "0 50% 50% 0",
        }}
        onClick={() => {
          setCounter((prev) => (prev < 10 ? prev + 1 : 10));
          changeHandler?.(x);
        }}
      >
        <Add />
      </Fab>
    </Box>
  );
};

export default Counter;
