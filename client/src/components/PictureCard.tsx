import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  ImageListItem,
} from "@mui/material";
import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface PictureProp {
  picture: {
    id: number;
    title: string;
    price: number;
    img: string;
    description: string;
  };
}

const PictureCard: FC<PictureProp> = ({ picture }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Grid item xs={12} sm={4}>
      <Card
        sx={{
          m: 3,
          display: "flex",
          flexDirection: "column",
          borderRadius: "15px",
          boxShadow:
            "0 13px 27px -5px rgb(50 50 93 / 25%), 0 8px 16px -8px rgb(0 0 0 / 30%)",
        }}
        onClick={() => navigate(location.pathname + "/" + picture.id)}
      >
        <CardContent sx={{ alignSelf: "center", cursor: "pointer" }}>
          <ImageListItem>
            <img
              src={picture.img}
              alt="Product image"
              style={{ width: "280px", height: "300px" }}
            />
          </ImageListItem>
        </CardContent>
        <CardActions sx={{ backgroundColor: "#1A1C29", p: 0 }}>
          <Button
            fullWidth
            variant="contained"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            {picture.title}
            <Typography component="span">{picture.price}$</Typography>
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default PictureCard;
