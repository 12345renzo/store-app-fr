import { Container, Grid2, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import NextLink from "next/link";
import foot from "../styles/footer.module.css";
import React from "react";

function FooterView() {
  // Estilos reutilizables
  const theme = {
    primaryColor: "black",
    textColor: "#ffffff",
    hoverColor: "red",
  };

  return (
    <footer
      style={{
        backgroundColor: theme.primaryColor,
        color: theme.textColor,
        borderTop: "5px solid aqua",
        boxShadow: "0px -10px 10px rgba(255, 255, 255, 0.6)",
        marginTop: "15px",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid2
          container
          spacing={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Sección About */}
          <Grid2 xs={12} md={4}>
            <Typography variant="h5" gutterBottom className={foot.pri}>
              Acerca de Nosotros
            </Typography>
            <Typography variant="body1" className={foot.sec}>
              Vogue Space es más que una tienda, es tu destino de moda. Desde
              2025, ofrecemos ropa y calzado para hombres y mujeres que combinan
              estilo, calidad y tendencia. Aquí encontrarás desde básicos
              elegantes hasta piezas únicas que destacan tu esencia. Vístete con
              actitud, crea tu propio espacio. 🚀✨
            </Typography>
          </Grid2>

          {/* Sección Links */}
          <Grid2 xs={6} md={2}>
            <Typography variant="h5" gutterBottom className={foot.pri}>
              Enlaces
            </Typography>
            <Grid2 container direction="column">
              <NextLink href="/about" legacyBehavior>
                <Link
                  color="inherit"
                  underline="hover"
                  sx={{ "&:hover": { color: theme.hoverColor } }}
                  className={foot.sec}
                >
                  Sobre nosotros
                </Link>
              </NextLink>
              <NextLink href="/contact" legacyBehavior>
                <Link
                  color="inherit"
                  underline="hover"
                  className={foot.sec}
                  sx={{ "&:hover": { color: theme.hoverColor }, mt: 1 }}
                >
                  Contacto
                </Link>
              </NextLink>
              <NextLink href="/faq" legacyBehavior>
                <Link
                  color="inherit"
                  underline="hover"
                  className={foot.sec}
                  sx={{ "&:hover": { color: theme.hoverColor }, mt: 1 }}
                >
                  FAQ
                </Link>
              </NextLink>
            </Grid2>
          </Grid2>

          {/* Sección Redes Sociales */}
          <Grid2 xs={6} md={3}>
            <Typography variant="h5" gutterBottom className={foot.pri}>
              Síguenos
            </Typography>
            <div>
              <IconButton
                aria-label="Facebook"
                sx={{
                  color: theme.textColor,
                  "&:hover": { color: theme.hoverColor },
                }}
              >
                <Facebook />
              </IconButton>
              <IconButton
                aria-label="Twitter"
                sx={{
                  color: theme.textColor,
                  "&:hover": { color: theme.hoverColor },
                }}
              >
                <Twitter />
              </IconButton>
              <IconButton
                aria-label="Instagram"
                sx={{
                  color: theme.textColor,
                  "&:hover": { color: theme.hoverColor },
                }}
              >
                <Instagram />
              </IconButton>
              <IconButton
                aria-label="LinkedIn"
                sx={{
                  color: theme.textColor,
                  "&:hover": { color: theme.hoverColor },
                }}
              >
                <LinkedIn />
              </IconButton>
            </div>
          </Grid2>

          {/* Sección Legal */}
          <Grid2 xs={12} md={3}>
            <Typography variant="h5" gutterBottom className={foot.pri}>
              Legal
            </Typography>
            <NextLink href="/privacy" legacyBehavior>
              <Link
                color="inherit"
                underline="hover"
                className={foot.sec}
                sx={{ "&:hover": { color: theme.hoverColor } }}
              >
                Política de Privacidad
              </Link>
            </NextLink>
            <br />
            <NextLink href="/terms" legacyBehavior>
              <Link
                color="inherit"
                underline="hover"
                className={foot.sec}
                sx={{ "&:hover": { color: theme.hoverColor }, mt: 1 }}
              >
                Términos de Servicio
              </Link>
            </NextLink>
          </Grid2>
        </Grid2>

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          className={foot.pri}
          sx={{ mt: 4, pt: 2, borderTop: "2px solid rgb(255,255,255)" }}
        >
          © {new Date().getFullYear()} Vogue Space. Todos los derechos
          reservados.
        </Typography>
      </Container>
    </footer>
  );
}

export default FooterView;
