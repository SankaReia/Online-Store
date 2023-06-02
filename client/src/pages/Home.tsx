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
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Typography component="p" sx={{ pt: 2, pb: 2 }}>
            Pretium lectus quam id leo in vitae turpis massa. Adipiscing elit
            pellentesque habitant morbi tristique. Nisl pretium fusce id velit
            ut tortor pretium viverra. Pharetra convallis posuere morbi leo urna
            molestie at elementum. Accumsan in nisl nisi scelerisque eu
            ultrices.
          </Typography>
          <Typography component="p">
            Diam phasellus vestibulum lorem sed risus. Scelerisque eleifend
            donec pretium vulputate. Ut tellus elementum sagittis vitae et leo.
            Sed odio morbi quis commodo odio. Egestas fringilla phasellus
            faucibus scelerisque eleifend donec pretium vulputate sapien.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
