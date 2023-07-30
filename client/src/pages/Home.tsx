import { Box, Card, CardContent, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import { categories } from "../utils/categories";

const Home: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextHandler();
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [currentIndex]);

  const nextHandler = () => {
    const isLastSlide = currentIndex === categories.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const previousHandler = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? categories.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  return (
    <Box>
      <Carousel
        title={categories[currentIndex].title}
        route={categories[currentIndex].route}
        background={categories[currentIndex].background}
        onNext={nextHandler}
        onPrevious={previousHandler}
      />

      <Card
        sx={{
          p: 2,
          borderRadius: "15px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <CardContent>
          <Typography variant="h6" component="h2" sx={{ color: "#2d6097" }}>
            Art Avenue is a creative oasis for lovers of art and aesthetics!
            Here you will find a wide selection of original paintings, posters
            and other works of art that will give your home a unique and unique
            atmosphere.
          </Typography>
          <Typography component="p" sx={{ pt: 2, pb: 2 }}>
            We strive to make the ordering process simple and convenient, so
            it's easy to find the right product on our website and make a
            purchase in just a few clicks. We guarantee high quality of work and
            careful packaging so that your order is delivered safely.
          </Typography>
          <Typography component="p">
            Art Avenue is not just a store, it is a place where ideas are born
            and dreams about art come true. Join our creative family and feel
            inspired every day!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
