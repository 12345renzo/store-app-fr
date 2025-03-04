import CardComponents from '@/components/CardComponents';
import { Divider, Grid2, Typography } from '@mui/material';
import React from 'react'

function PrincipalView() {
  return (
    <>
      {/* Titulo */}
      <Grid2
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ margin: "30px 0 0 0", width: "100%" }}
      >
        <Grid2
          display="flex"
          alignItems="center"
          sx={{ width: "100%", maxWidth: "600px" }} // Ajusta el ancho según necesites
        >
          <Divider sx={{ flexGrow: 1, height: "2px", bgcolor: "aqua" }} />
          <Typography
            variant="h4"
            sx={{
              color: "aqua",
              fontSize: "42px",
              textShadow: "0 0px 25px rgba(255, 255, 255, 0.8)",
              mx: 2, // Espacio entre el texto y los dividers
              whiteSpace: "nowrap", // Para evitar que el texto se divida en varias líneas
            }}
          >
            Mis Productos
          </Typography>
          <Divider sx={{ flexGrow: 1, height: "2px", bgcolor: "aqua" }} />
        </Grid2>
      </Grid2>
    </>
  );
}

export default PrincipalView