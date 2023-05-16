import { FC, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PictureCard from "../components/PictureCard";
import pictures from "../pictures"; //------------------------Массив картин
import { useLocation } from "react-router-dom";
import { categories } from "../utils/categories";

const Shop: FC = () => {
  const location = useLocation();
  const [title, setTitle] = useState<string>();

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
          .filter((el) => el.category === title)
          .map((picture) => (
            <PictureCard key={picture.id} picture={picture} />
          ))}
      </Grid>
    </Box>
  );
};

export default Shop;
