import { FC, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PictureCard from "../components/PictureCard";
import { useLocation } from "react-router-dom";
import { categories } from "../utils/categories";
import { pictureAPI } from "../services/PictureService";
import { PictureI } from "../utils/models";
import Loader from "../UI/Loader";

const Shop: FC = () => {
  const location = useLocation();
  const [title, setTitle] = useState<string>();
  const { data: pictures } = pictureAPI.useFetchAllPicturesQuery("");

  useEffect(() => {
    const cateogry = categories.find((el) => el.route === location.pathname);
    setTitle(cateogry?.title);
  }, [location]);

  return (
    <>
      {pictures ? (
        <Box>
          <Typography
            variant="h5"
            component="h2"
            sx={{ textAlign: "center", textTransform: "uppercase" }}
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Shop;
