import { Box, CircularProgress } from '@mui/material';
import React from 'react'

function CargarComponet() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo gris semitransparente
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Asegura que esté por encima de todo
      }}
    >
      <CircularProgress
        size="3rem"
        sx={{
          color: "aqua",
          filter: "drop-shadow(0px 0px 10px white)", // Sombra blanca alrededor
        }}
      />
    </Box>
  );
}

export default CargarComponet