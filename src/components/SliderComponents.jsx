"use cliente";
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import navin from "../styles/nav.module.css";
import Link from "next/link";
import { useState } from "react";
import useAuthStore from "@/hooks/useAuthStore";
import useProductoStore from "@/hooks/useProductoStore";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ModalPerfil from "@/view/ModalPerfil";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import SearchIcon from "@mui/icons-material/Search";

function SliderComponents({ mobileOpen, handleDrawerToggle }) {
  const drawerWidth = 240;
  const [open, setopen] = useState(false);
  const { status, startLogout, rol } = useAuthStore();
  const { carrito } = useProductoStore();

  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          my: 2,
          fontWeight: "bold",
          color: "aqua",
          textShadow: "0 0 25px rgba(0, 255, 255, 1.9)",
          "&:hover": {
            color: "white",
          },
        }}
      >
        <Link href="/store/home" className={navin.princi}>
          Vogue Space
        </Link>
      </Typography>
      <Divider
        sx={{
          border: "3px solid aqua",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
        }}
      />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} className={navin.lista}>
            <ListItemText sx={{ fontWeight: "650" }}>
              <Link href="/store/home/shop" className={navin.items}>
                <Badge badgeContent={carrito.length} color="default">
                  <LocalMallIcon className={navin.iconos} />
                </Badge>
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        {status == "authenticated" ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                className={navin.lista}
              >
                <ListItemText sx={{ fontWeight: "650" }}>
                  <Button
                    style={{
                      textTransform: "none",
                      padding: "0",
                      fontSize: "16.2px",
                    }}
                    className={navin.option}
                    onClick={handleOpen}
                  >
                    Perfil
                  </Button>
                  <ModalPerfil open={open} handleClose={handleClose} />
                </ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                className={navin.lista}
              >
                <ListItemText sx={{ fontWeight: "650" }}>
                  <Link
                    href="/store/home/producto/pedido"
                    style={{ padding: "2px 10px", borderRadius: "4px" }}
                    className={navin.option}
                  >
                    Pedidos
                  </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                sx={{ textAlign: "center" }}
                className={navin.lista}
              >
                <ListItemText sx={{ fontWeight: "650" }}>
                  <Link
                    href="/store/auth/login"
                    style={{ padding: "2px 10px", borderRadius: "4px" }}
                    className={navin.option}
                    onClick={() => startLogout()}
                  >
                    Salir
                  </Link>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              className={navin.lista}
            >
              <ListItemText sx={{ fontWeight: "650" }}>
                <Link
                  href="/store/auth/login"
                  className={navin.items}
                  style={{
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: "600",
                  }}
                >
                  Iniciar
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        )}

        {rol == "Admin" ? (
          <ListItem disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              className={navin.lista}
            >
              <ListItemText sx={{ fontWeight: "650" }}>
                <Link className={navin.items} href="/store/dashboard">
                  <IntegrationInstructionsIcon
                    sx={{ color: "aqua" }}
                    className={navin.iconos}
                  />
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}

        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} className={navin.lista}>
            <ListItemText sx={{ fontWeight: "650" }}>
              <Link className={navin.items} href="/store/home/search">
                <SearchIcon sx={{ color: "aqua" }} className={navin.iconos} />
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <nav>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            backgroundColor: "black",
            borderRight: "5px solid aqua",
            boxShadow: "10px 0px 15px rgba(255, 255, 255, 0.8)",
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </nav>
  );
}

SliderComponents.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default SliderComponents;
