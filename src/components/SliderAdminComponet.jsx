import React from "react";
import PropTypes from "prop-types";
import navin from "../styles/nav.module.css";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material";
import Link from "next/link";

function SliderAdminComponet({ mobileOpen, handleDrawerToggle }) {
  const drawerWidth = 240;

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
        <Link href="/store/dashboard" className={navin.princi}>
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
              <Link href="/store/dashboard" className={navin.items}>
                Productos
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} className={navin.lista}>
            <ListItemText sx={{ fontWeight: "650" }}>
              <Link href="/store/dashboard/categoria" className={navin.items}>
                Categoria
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} className={navin.lista}>
            <ListItemText sx={{ fontWeight: "650" }}>
              <Link href="/store/dashboard/usuarios" className={navin.items}>
                Usuarios
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} className={navin.lista}>
            <ListItemText sx={{ fontWeight: "650" }}>
              <Link href="/store/dashboard/pedidos" className={navin.items}>
                Pedidos
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }} className={navin.lista}>
            <ListItemText sx={{ fontWeight: "650" }}>
              <Link href="/store/home" className={navin.items}>
                Regresar
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

SliderAdminComponet.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default SliderAdminComponet;
