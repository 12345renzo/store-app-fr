"use client";
import { Badge, Button, CardMedia, Grid2, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import pri from "../styles/principal.module.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import React from "react";
import useProductoStore from "@/hooks/useProductoStore";
import Swal from "sweetalert2";

function CardItem({ producto }) {
  const env = useRouter();
  const { agregarCarrito, productoActive, menssage } = useProductoStore();

  const agregar = (e) => {
    e.stopPropagation();
    e.preventDefault();

    let siz;
    if (producto.categoria == "ropa") {
      siz = { talla: "M" };
    } else {
      siz = { talla: "38" };
    }

    const pro = { ...producto, cantidad: 1, talla: siz.talla };

    let regreso = agregarCarrito({ dato: pro });

    if (regreso) {
      Swal.fire("Sistema", "Agregado Correctamente", "success");
    } else {
      Swal.fire(
        "Sistema",
        menssage == null ? "Producto ya se encuentra en el carrito" : menssage,
        "error"
      );
    }
  };

  const mostra = () => {
    env.push(`/store/home/producto/${producto.idproducto}`);
    productoActive({ dato: producto });
  };

  return (
    <div onClick={mostra} style={{ cursor: "pointer" }}>
      <Grid2
        container
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          width: "100%",
          textAlign: "center",
          color: "black",
          "&:hover": {
            backgroundColor: "black",
            color: "white",
          },
          height: "100%",
        }}
      >
        {/* Descuento usar = display: showBadge ? "block" : "none" */}
        <Grid2
          size={12}
          display={producto.descuento == 0 ? "none" : "flex"}
          justifyContent="end"
        >
          <Badge
            badgeContent={"-" + parseInt(producto.descuento) + "%"}
            color="error"
            sx={{ padding: "0 5px" }}
          />
        </Grid2>

        {/* Imagen */}
        <Grid2
          size={12}
          sx={{ overflow: "hidden", borderRadius: "10px 10px 0 0" }}
        >
          <CardMedia
            component="img"
            image={producto.foto1}
            sx={{
              height: "300px",
              objectFit: "cover",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        </Grid2>

        {/* Título */}
        <Grid2 size={12}>
          <Typography variant="h5" className={pri.tit}>
            {producto.nombre.length > 18
              ? producto.nombre.slice(0, 18) + "..."
              : producto.nombre}
          </Typography>
        </Grid2>

        {/* Descripción */}
        <Grid2 size={12}>
          <Typography variant="subtitle2" className={pri.subti}>
            {producto.descripcion.length > 38
              ? producto.descripcion.slice(0, 38) + "..."
              : producto.descripcion}
          </Typography>
        </Grid2>

        {/* Precio y botón */}
        <Grid2
          size={12}
          display="flex"
          justifyContent="space-around"
          alignItems="center"
        >
          <Typography variant="subtitle1" className={pri.preci}>
            ${producto.precio}
          </Typography>
          <Button onClick={agregar} aria-label="agregar">
            <AddShoppingCartIcon color="error" className={pri.car} />
          </Button>
        </Grid2>
      </Grid2>
    </div>
  );
}

export default CardItem;
