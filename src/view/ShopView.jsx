"use client";
import CarritoItem from "@/components/CarritoItem";
import {
  Button,
  Container,
  Divider,
  Grid2,
  Pagination,
  Typography,
} from "@mui/material";
import Link from "next/link";
import pro from "../styles/producto.module.css";
import React, { useEffect, useState } from "react";
import useProductoStore from "@/hooks/useProductoStore";
import useAuthStore from "@/hooks/useAuthStore";
import Swal from "sweetalert2";
import { useRouter, usePathname } from "next/navigation";

function ShopView() {
  // all lo del carrito
  const { carrito, agregarPedido,agregarBusqueda, menssage, sinCarrito } = useProductoStore();
  useEffect(() => {
    agregarBusqueda({para:""});
  }, []);
  const ruta = useRouter();
  const { id } = useAuthStore();
  const [pagina, setpagina] = useState(1);
  const otrapagina = (event, value) => {
    setpagina(value);
  };
  const lastPage = Math.ceil(carrito.length / 5);
  const inicio = (pagina - 1) * 5;
  const carritoPaginado = carrito.slice(inicio, inicio + 5);

  //vaina del sacar el total
  const subtotals = carrito.reduce(
    (total, car) => total + car.precio * car.cantidad,
    0
  );
  const subtotal = Math.round((subtotals) * 100) / 100;
  const final = carrito.reduce((total, car) => {
    const descuentoDecimal = car.descuento > 0 ? car.descuento / 100 : 0;
    const precioConDescuento =
      car.precio * car.cantidad * (1 - descuentoDecimal);
    return total + precioConDescuento;
  }, 0);
  const descu = Math.round((subtotal - final) * 100) / 100;
  const igv = Math.round(subtotal * 0.18 * 100) / 100;
  const finalcomple = Math.round((subtotal - descu + igv) * 100) / 100;
  const montos = {
    subtotal,
    igv,
    descuento: descu,
    total: finalcomple
  }
  const path = usePathname();
  const enviar = async() => {
    const da = await agregarPedido({ usuario: id, total: montos });
    if(da){
      Swal.fire('Sistema',menssage,'success');
      sinCarrito();
    }
    else{
      Swal.fire('Sistema',menssage==""?"Inicie Secion Primero":menssage,'error');
      localStorage.setItem('ruta',path);
      ruta.push('/store/auth/login');
    }
  }

  return (
    <>
      <Container maxWidth="lg">
        <Grid2 container size={12} spacing={2} mt="115px" mb="55px">
          {/*titulo de la pagina */}
          <Grid2
            size={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            color="aqua"
          >
            <Typography variant="h4" className={pro.resu} pb="25px">
              Carro de Compra
            </Typography>
          </Grid2>

          {/*aki estan las card de compra */}
          <Grid2
            size={{ xs: 12, md: 6 }}
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", sm: "space-around" },
              alignItems: "center",
              color: "white",
              border: "3px solid aqua",
              borderRadius: "10px",
              boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.8)",
            }}
          >
            {/*contenido del carrito de product */}
            {carrito.length == 0 ? (
              <Typography variant="h6">No ay Producto</Typography>
            ) : (
              carritoPaginado.map((car) => (
                <CarritoItem key={car.idproducto} carro={car} />
              ))
            )}

            {/*paginacion de los carritos */}
            {carrito.length == 0 ? (
              ""
            ) : (
              <Grid2
                size={12}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: "10px",
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
                  count={lastPage}
                  showFirstButton
                  showLastButton
                  page={pagina}
                  onChange={otrapagina}
                />
              </Grid2>
            )}
          </Grid2>

          {/*aki va el resumen de la venta */}
          <Grid2
            container
            size={{ xs: 12, md: 6 }}
            sx={{
              color: "white",
              height: "355px",
              position: "sticky",
              top: "100px",
              alignSelf: "flex-start",
            }}
          >
            <Grid2 size={12}>
              <Typography variant="h5" className={pro.resu}>
                Resumen de Compra
              </Typography>
            </Grid2>

            <Grid2
              size={12}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">Subtotal</Typography>
              <Typography variant="subtitle1">${parseFloat(subtotal)}</Typography>
            </Grid2>
            <Grid2
              size={12}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">Descuento</Typography>
              <Typography variant="subtitle1">- ${parseFloat(descu)}</Typography>
            </Grid2>
            <Grid2
              size={12}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1">Igv</Typography>
              <Typography variant="subtitle1">+ ${parseFloat(igv)}</Typography>
            </Grid2>
            <Divider
              sx={{
                borderRadius: "25px",
                border: "3px solid aqua",
                width: "100%",
                backgroundColor: "aqua",
              }}
            />
            <Grid2
              size={12}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                Total
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: "600" }}>
                ${parseFloat(finalcomple)}
              </Typography>
            </Grid2>
            {carrito.length == 0 ? (
              ""
            ) : (
              <Grid2 size={12}>
                <Button
                  className={pro.especial}
                  sx={{ width: "100%" }}
                  onClick={enviar}
                >
                  Continuar
                </Button>
              </Grid2>
            )}
            <Grid2
              size={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Link href="/" className={pro.enlace}>
                Seguir Comprando
              </Link>
            </Grid2>
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}

export default ShopView;
