import React from "react";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Card, CardMedia } from "@mui/material";

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        right: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        color: "white",
        bgcolor: "rgba(0,0,0,0.5)",
        "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
      }}
    >
      <ArrowForwardIosIcon />
    </IconButton>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <IconButton
      onClick={onClick}
      sx={{
        position: "absolute",
        left: "20px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        color: "white",
        bgcolor: "rgba(0,0,0,0.5)",
        "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
      }}
    >
      <ArrowBackIosNewIcon />
    </IconButton>
  );
}

function CarruselComponent() {
  const theme = useTheme();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const images = [
    {
      src: "https://res.cloudinary.com/dct8kss9p/image/upload/v1741107598/oxof3ryqbebidf3ldkt9.webp",
      text: "Productos para hombres",
    },
    {
      src: "https://res.cloudinary.com/dct8kss9p/image/upload/v1741107598/dtllaxlpecqqyjsvwum1.avif",
      text: "Productos para mujeres",
    },
    {
      src: "https://res.cloudinary.com/dct8kss9p/image/upload/v1741107598/qmlu6kedxgqawdn29a5y.avif",
      text: "Accesorios de moda",
    },
    {
      src: "https://res.cloudinary.com/dct8kss9p/image/upload/v1741107598/yojtouhvcp9j5chibhbw.jpg",
      text: "Zapatos exclusivos",
    },
    {
      src: "https://res.cloudinary.com/dct8kss9p/image/upload/v1741107598/yle03c0gr1tvnlao6rqq.jpg",
      text: "Nuevas tendencias",
    },
  ];

  return (
    <Box sx={{ maxWidth: "90%", margin: "0 auto", paddingTop: "55px" }}>
      <Slider {...settings}>
        {images.map((item, index) => (
          <Box key={index} sx={{ px: 1, py: 1 }}>
            <Card
              sx={{
                position: "relative",
                borderRadius: 2,
                overflow: "hidden",
                "&:hover": {
                  boxShadow: "0 0 10px 5px rgba(0, 255, 255, 0.8)",
                },
              }}
            >
              {/* Imagen del producto */}
              <CardMedia
                component="img"
                image={item.src}
                alt={`Product ${index + 1}`}
                sx={{
                  height: "480px",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              />

              {/* Fondo gris y texto que aparece al hacer hover */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bgcolor: "rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  "&:hover": { opacity: 1 },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            </Card>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default CarruselComponent;
