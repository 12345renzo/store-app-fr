import AuthRedirect from "@/components/AuthRedirect";
import AdminCateView from "@/view/AdminCateView";
import SearchProduc from "@/view/SearchProduc";
import { Container, Divider, Grid2, Typography } from "@mui/material";
import React from "react";

async function page({ searchParams }) {
  const searchQuery = searchParams?.q || "";

  return (
    <>
      <AuthRedirect allowedRoles={["Admin"]}>
        <Grid2
          container
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ margin: "115px 0 0 0", width: "100%" }}
        >
          <Grid2
            display="flex"
            alignItems="center"
            sx={{ width: "100%", maxWidth: "600px" }} // Ajusta el ancho según necesites
          >
            <Divider sx={{ flexGrow: 1, height: "2px", bgcolor: "aqua" }} />
            <Typography
              variant="h5"
              sx={{
                color: "aqua",
                fontSize: "42px",
                textShadow: "0 0px 25px rgba(255, 255, 255, 0.8)",
                mx: 2, // Espacio entre el texto y los dividers
                whiteSpace: "nowrap", // Para evitar que el texto se divida en varias líneas
              }}
            >
              Categorias
            </Typography>
            <Divider sx={{ flexGrow: 1, height: "2px", bgcolor: "aqua" }} />
          </Grid2>
        </Grid2>
        <Container maxWidth="xl">
          <Grid2
            size={12}
            container
            spacing={2}
            display="flex"
            justifyContent="right"
            alignItems="center"
            m="55px 0 0 0"
          >
            <Grid2
              container
              size={{ sm: 6, xs: 12 }}
              display="flex"
              justifyContent="start"
              alignItems="center"
              m="15px 0"
            >
              <SearchProduc initialQuery={searchQuery} />
            </Grid2>
          </Grid2>
        </Container>
        <AdminCateView buscar={searchQuery} />
      </AuthRedirect>
    </>
  );
}

export default page;
