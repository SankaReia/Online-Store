import { FC, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PictureCard from "../components/PictureCard";
import { useLocation } from "react-router-dom";
import { categories } from "../utils/categories";
import { PictureI } from "../store/slices/pictureSlice";
import { useAppSelector } from "../hooks/redux";

const Shop: FC = () => {
  const location = useLocation();
  const [title, setTitle] = useState<string>();
  const pictures = useAppSelector((state) => state.pictureReducer);

  useEffect(() => {
    const cateogry = categories.find((el) => el.route === location.pathname);
    setTitle(cateogry?.title);
  }, [location.pathname]);

  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        sx={{ textAlign: "center", mt: 3, textTransform: "uppercase" }}
      >
        {title}
      </Typography>
      <Grid container alignItems="flex-end">
        {pictures
          ?.filter((el: PictureI) => el.category === title)
          .map((picture: PictureI) => (
            <PictureCard key={picture.id} picture={picture} />
          ))}
      </Grid>
    </Box>
  );
};

export default Shop;
