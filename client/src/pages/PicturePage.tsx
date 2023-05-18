import { Add, ArrowRightAlt, Remove } from "@mui/icons-material";
import {
  Button,
  Box,
  Fab,
  Grid,
  ImageListItem,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { PictureI } from "../store/slices/pictureSlice";

const ModalPrice = {
  background: "black",
  borderRadius: "20px",
  fontSize: 24,
  color: "white",
  display: "inline-block",
  p: "8px 20px",
  mb: 2,
};

const PicturePage: FC = () => {
  const { id } = useParams();
  const [counter, setCounter] = useState<number>(0);
  const pictures = useAppSelector((state) => state.pictureReducer);
  const [picture, setPicture] = useState<PictureI>();

  useEffect(() => {
    if (id) {
      const picture = pictures.find((el) => el.id === +id);
      setPicture(picture);
    }
  }, [id]);

  if (!picture) {
    return <div>Loading</div>;
  }

  return (
    <Box>
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: "center", mt: 5, mb: 5 }}
      >
        {picture.title}
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <ImageListItem>
            <img
              src={process.env.REACT_APP_API_URL + picture.img}
              style={{ width: "500px", height: "360px" }}
              alt="product image"
            />
          </ImageListItem>
        </Grid>

        <Grid item xs={6}>
          <Typography sx={ModalPrice}>{picture.price} $</Typography>
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
            <div style={{ display: "flex" }}>
              <Fab
                sx={{
                  bgcolor: "white",
                  border: "3px solid black",
                  borderRadius: "50% 0 0 50%",
                }}
                onClick={() => setCounter((prev) => prev - 1)}
              >
                <Remove />
              </Fab>

              <input
                type="number"
                readOnly
                value={counter}
                style={{
                  border: "3px solid #000",
                  borderLeft: "none",
                  borderRight: "none",
                  fontSize: "24px",
                  width: "56px",
                  textAlign: "center",
                }}
              />
              <Fab
                sx={{
                  bgcolor: "white",
                  border: "3px solid black",
                  borderRadius: "0 50% 50% 0",
                }}
                onClick={() => setCounter((prev) => prev + 1)}
              >
                <Add />
              </Fab>
            </div>
            <Button
              variant="contained"
              sx={{
                borderRadius: "30px",
                padding: "15px 20px",
                background: "black",
              }}
            >
              Add to cart
              <ArrowRightAlt />
            </Button>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PicturePage;
