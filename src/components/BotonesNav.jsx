"use client";
import { Badge, Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import navin from "../styles/nav.module.css";
import Link from "next/link";
import ModalPerfil from "@/view/ModalPerfil";
import useAuthStore from "@/hooks/useAuthStore";
import useProductoStore from "@/hooks/useProductoStore";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

function BotonesNav() {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setopen] = useState(false);
  const { status, startLogout, rol } = useAuthStore();
  const { carrito } = useProductoStore();

  const handleOpen = () => setopen(true);
  const handleClose = () => setopen(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {/*bolsa de trabajo */}
      <Box sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}>
        <Link href="/store/home/shop" className={navin.items}>
          <Badge badgeContent={carrito.length} color="default">
            <LocalMallIcon className={navin.iconos} />
          </Badge>
        </Link>
      </Box>

      {status == "authenticated" ? (
        <>
          {/*usuarios */}
          <Box sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}>
            <Button
              onClick={handleOpenUserMenu}
              className={navin.boton}
              sx={{ color: "#fff" }}
            >
              <PersonIcon sx={{ color: "aqua" }} className={navin.iconos} />
            </Button>
            <Menu
              sx={{
                mt: "15px",
                ml: "55px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                "& .MuiMenu-paper": {
                  backgroundColor: "black",
                  border: "5px solid aqua",
                  boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.8)",
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
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
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link
                  href="/store/home/producto/pedido"
                  style={{ padding: "2px 10px", borderRadius: "4px" }}
                  className={navin.option}
                >
                  Pedidos
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Link
                  href="/store/auth/login"
                  style={{ padding: "2px 10px", borderRadius: "4px" }}
                  className={navin.option}
                  onClick={() => startLogout()}
                >
                  Salir
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </>
      ) : (
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <Link
            href="/store/auth/login"
            className={navin.items}
            style={{ color: "#fff", textTransform: "none", fontWeight: "600" }}
          >
            Iniciar
          </Link>
        </Box>
      )}

      {rol == "Admin" ? (
        <Box sx={{ display: { xs: "none", sm: "flex" } }}>
          <Link className={navin.items} href="/store/dashboard">
            <IntegrationInstructionsIcon
              sx={{ color: "aqua" }}
              className={navin.iconos}
            />
          </Link>
        </Box>
      ) : (
        ""
      )}

      {/*serarch de shops */}
      <Box sx={{ display: { xs: "none", sm: "flex" } }}>
        <Link className={navin.items} href="/store/home/search">
          <SearchIcon sx={{ color: "aqua" }} className={navin.iconos} />
        </Link>
      </Box>
    </>
  );
}

export default BotonesNav;
