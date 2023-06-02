import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { NavigateNext, NavigateBefore } from "@mui/icons-material";

interface CarouselProp {
  title: string;
  route: string;
  background: string;
  onNext: () => void;
  onPrevious: () => void;
}

const ArrowStyle = {
  color: "white",
  fontSize: 60,
  position: "absolute",
  top: "50%",
  cursor: "pointer",
  transform: "translate(0, -50%)",
};

const Carousel: FC<CarouselProp> = ({
  title,
  route,
  background,
  onNext,
  onPrevious,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        mb: 5,
      }}
    >
      <NavigateBefore sx={ArrowStyle} onClick={() => onPrevious()} />
      <Card
        sx={{
          p: 5,
          borderRadius: "15px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          background: `url(${background})`,
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            component="h2"
            sx={{ color: "orange", textTransform: "uppercase" }}
          >
            {title}
          </Typography>
          <Typography
            component="p"
            sx={{ pt: 2, pb: 2, maxWidth: "500px", color: "white" }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <ul style={{ color: "white" }}>
            <li>34 mi tempus imperdiet</li>
            <li>iaculis 1 eu 3 non</li>
            <li>ante in nibh 2500</li>
          </ul>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{
              background: "orange",
              color: "black",
              ":hover": { color: "white" },
            }}
            onClick={() => navigate(route)}
          >
            SHOP SHOW
          </Button>
        </CardActions>
      </Card>
      <NavigateNext sx={{ ...ArrowStyle, right: 0 }} onClick={() => onNext()} />
    </Box>
  );
};

export default Carousel;
