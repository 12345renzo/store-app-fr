"use client";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BotonesNav from "../components/BotonesNav";
import SliderComponents from "../components/SliderComponents";
import navin from "../styles/nav.module.css";
import Link from "next/link";

function NavbarView() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" className={navin.caja}>
        <Toolbar>
          {/*este es el amburger */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 3, display: { sm: "none" } }}
          >
            <MenuIcon className={navin.iconos} />
          </IconButton>

          {/*este es el nombre del navbar */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "bold",
              textShadow: "0 0 25px rgba(0, 255, 255, 1.9)",
              flexGrow: 1,
              display: "flex",
              justifyContent: { xs: "center", sm: "flex-start" },
              width: "100%",
              left: 0,
            }}
          >
            <Link
              href="/store/home"
              className={navin.princi}
            >
              Vogue Space
            </Link>
          </Typography>

          {/*aqui esta los votones de la derecha */}
            <BotonesNav />
        </Toolbar>
      </AppBar>

      {/* sLIDERBAR para cuando este pequeño la pantalla*/}
        <SliderComponents
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
    </Box>
  );
}

export default NavbarView;
