"use client";
import { Button, Container, Grid2, Typography } from "@mui/material";
import pro from "../../../../../styles/producto.module.css";
import React, { useEffect, useState } from "react";
import useProductoStore from "@/hooks/useProductoStore";
import useAuthStore from "@/hooks/useAuthStore";
import PedidoItem from "@/components/PedidoItem";
import { useRouter } from "next/navigation";
import AuthRedirect from "@/components/AuthRedirect";

function page() {
  const { pedido, listarPedido, agregarBusqueda } = useProductoStore();
  const { id,rol } = useAuthStore();
  const [pagina, setpagina] = useState(1);
  const router = useRouter();
  
  useEffect(() => {
    listarPedido({ usuario: id, page: pagina });
    agregarBusqueda({ para: "" });
  }, [pagina]);

  const otrapagina = (event, value) => {
    setpagina(value);
  };

  return (
    <>
      <AuthRedirect allowedRoles={["Usuario", "Admin"]}>
        <Container maxWidth="lg">
          <Grid2
            container
            size={12}
            spacing={2}
            sx={{ color: "white", mt: "105px", mb: "38px" }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Grid2
              size={12}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h4" className={pro.resu}>
                Lista de Pedido
              </Typography>
            </Grid2>
            {pedido.length != 0 ? (
              pedido.map((pe) => <PedidoItem key={pe.idpedido} pedido={pe} />)
            ) : (
              <Grid2
                size={12}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Typography variant="h6" className={pro.resu}>
                  No tienes pedidos
                </Typography>
              </Grid2>
            )}
          </Grid2>
        </Container>
      </AuthRedirect>
    </>
  );
}

export default page;
