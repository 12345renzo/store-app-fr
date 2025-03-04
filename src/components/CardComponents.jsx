"use client";
import { Grid2, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardItem from "./CardItem";
import useProductoStore from "@/hooks/useProductoStore";

function CardComponents() {
  const {productoVisibles, listarProducto, paginas, busqueda, listaProductoFiltro} = useProductoStore();
  const [pagina, setpagina] = useState(1);
  useEffect(() => {
    if(busqueda == null || busqueda == ""){
      listarProducto({page:pagina});
    }
    else{
      listaProductoFiltro({q: busqueda, page:pagina});
    }
  }, [pagina, busqueda]);

  const otrapagina = (event, value) => {
    setpagina(value);
  }
  
  return (
    <>
      <Grid2
        container
        spacing={3}
        columns={12}
        sx={{ margin: "35px 5% 3% 5%" }}
        display="flex"
        alignItems= "stretch"
      >
        {productoVisibles.map((pro, index) => (
          <Grid2
            key={index}
            size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2.4 }}
            sx={{
              border: "5px solid aqua",
              borderRadius: "15px",
              "&:hover": {
                boxShadow: "0 0 10px 5px rgba(0, 255, 255, 0.8)",
              },
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              height:'100%'
            }}
          >
            <CardItem producto={pro} />
          </Grid2>
        ))}
        <Grid2
          size={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Pagination
            color="error"
            variant="text"
            sx={{
              color: "white",
              backgroundColor: "transparent",
              "& .MuiPaginationItem-root": {
                color: "white",
              },
            }}
            count={paginas}
            showFirstButton
            showLastButton
            page={pagina}
            onChange={otrapagina}
          />
        </Grid2>
      </Grid2>
    </>
  );
}

export default CardComponents;
