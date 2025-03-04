"use client";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid2,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import pro from "../styles/producto.module.css";
import Link from "next/link";
import useProductoStore from "@/hooks/useProductoStore";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function ProductoView() {
  
  const size = ["35.5", "36", "37", "37.5", "38", "38.5", "39"];
  const piesa = ["XS", "S", "M", "L", "XL"];
  
  const { productoActivo, limpiarProductoActive, agregarCarrito, menssage } =
  useProductoStore();
  
  const [imgs, setimgs] = useState(productoActivo?.foto1);
  const [si, setsi] = useState(null);
  const [cant, setcant] = useState(1);
  const ruta = useRouter();
  
  
  const images = [
    productoActivo?.foto1,
    productoActivo?.foto2,
    productoActivo?.foto3,
    productoActivo?.foto4,
    productoActivo?.foto5,
  ];

  const cambio = (i) => {
    setimgs(i);
  };

  const select = (s) => {
    setsi(s);
  };

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      cambio(images[index]); // Cambia la imagen usando el nombre
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const enviar = () => {
    const datos = { ...productoActivo, cantidad: cant, talla: si };
    const retor = agregarCarrito({ dato: datos });
    if (retor) {
      Swal.fire("Sistema", "Agregado Correctamente", "success");
      ruta.push('/');
    } else {
      Swal.fire("Sistema",menssage==""?'Ya se encuentra en el Carrito':menssage,'error');
    }
  };

  const retornar = () => {
    ruta.push("/store/home");
    limpiarProductoActive();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 3.5 }}>
      <Grid2
        container
        size={12}
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {/*lado de las imagenes */}
        <Grid2 container spacing={3} size={{ sm: 12, md: 6 }}>
          {/*la img de los productos */}
          <Grid2
            size={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ overflow: "hidden", pt: "35px", pb: "55px" }}
          >
            <CardMedia
              component="img"
              image={imgs}
              alt="imgs"
              sx={{
                width: "80%",
                height: "500px",
                objectFit: "cover",
                borderRadius: "25px",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 0 30px 2px rgba(0, 255, 255, 0.8)",
                },
              }}
            />
          </Grid2>

          {/*los img pequeños de la prenda */}
          <Grid2
            size={12}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            flexWrap="wrap"
            sx={{ p: "10px" }}
          >
            {images.map((tol,index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  onClick={() => cambio(tol)}
                  style={{ overflow: "hidden" }}
                >
                  <CardMedia
                    component="img"
                    image={tol}
                    alt="imgs"
                    sx={{
                      width: "65px",
                      height: "65px",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 0 55px 2px rgba(0, 255, 255, 0.8)",
                      },
                    }}
                  />
                </Button>
              </Box>
            ))}
          </Grid2>
        </Grid2>

        {/*lado de los productos */}
        <Grid2 container size={{ sm: 12, md: 6 }} sx={{ color: "white" }}>
          {/*este es el title */}
          <Grid2 size={12}>
            <Typography
              variant="h4"
              sx={{ fontWeight: "600", textAlign: "center" }}
              className={pro.resu}
            >
              {productoActivo?.nombre}
            </Typography>
          </Grid2>

          {/*este es el id */}
          <Grid2 size={12}>
            <Typography variant="subtitle1">
              <span className={pro.resu}>SKI: </span>
              {productoActivo?.idproducto}
            </Typography>
          </Grid2>

          {/*categoria*/}
          <Grid2
            container
            size={{ xs: 6, sm: 8, md: 6 }}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography variant="subtitle1" className={pro.resu}>
              Categoria:{" "}
            </Typography>
            <Typography variant="subtitle1">
              {productoActivo?.categoria}
            </Typography>
          </Grid2>

          {/*sexo */}
          <Grid2
            container
            size={{ xs: 6, sm: 8, md: 6 }}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography variant="subtitle1" className={pro.resu}>
              Sexo:{" "}
            </Typography>
            <Typography variant="subtitle1">{productoActivo?.sexo}</Typography>
          </Grid2>

          {/*este es el precio */}
          <Grid2
            container
            size={{ xs: 6, sm: 8, md: 6 }}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography variant="subtitle1" className={pro.resu}>
              P. Normal:{" "}
            </Typography>
            <Typography variant="subtitle1">
              $ {productoActivo?.precio}
            </Typography>
          </Grid2>

          {/*este es el descuento */}
          <Grid2
            container
            size={{ xs: 6, sm: 8, md: 6 }}
            display={productoActivo?.descuento == 0 ? "none" : "flex"}
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography variant="subtitle1" className={pro.resu}>
              Descuento:{" "}
            </Typography>
            <Typography variant="subtitle1">
              - {parseInt(productoActivo?.descuento)}%
            </Typography>
          </Grid2>

          {/*este es el descrip */}
          <Grid2 size={12}>
            <Typography variant="subtitle1">
              <span className={pro.resu}>Descripcion: </span>
              {productoActivo?.descripcion}
            </Typography>
          </Grid2>

          {/*botonera de tallas */}
          <Grid2
            size={12}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            flexWrap="wrap"
            sx={{ p: "10px" }}
          >
            <Grid2 size={12}>
              <Typography variant="subtitle1">
                <span className={pro.resu}>Talla elegido:</span> {si}
              </Typography>
            </Grid2>
            {productoActivo?.categoria != "ropa"
              ? size.map((tol) => (
                  <Box
                    key={tol}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button onClick={() => select(tol)} className={pro.but}>
                      {tol}
                    </Button>
                  </Box>
                ))
              : piesa.map((tol) => (
                  <Box
                    key={tol}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button onClick={() => select(tol)} className={pro.but}>
                      {tol}
                    </Button>
                  </Box>
                ))}
          </Grid2>

          {/*aki se activa si selecciona una talla y sale el boton de carrito */}
          {si === null ? (
            ""
          ) : (
            <Grid2
              size={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
            >
              <Button onClick={() => setcant(cant + 1)} className={pro.but}>
                +
              </Button>
              <Typography variant="subtitle1">{cant}</Typography>
              <Button
                onClick={() => setcant(Math.max(1, cant - 1))}
                className={pro.but}
              >
                -
              </Button>
              <Button className={pro.especial} onClick={enviar}>
                <AddShoppingCartIcon color="error" />
                &nbsp; Agregar
              </Button>
            </Grid2>
          )}

          <Grid2
            size={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button onClick={retornar} className={pro.especial}>
              Seguir Comprando
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default ProductoView;
