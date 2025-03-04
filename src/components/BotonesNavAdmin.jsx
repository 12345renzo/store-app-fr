import navin from "../styles/nav.module.css";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import CategoryIcon from "@mui/icons-material/Category";
import GroupIcon from "@mui/icons-material/Group";
import DiscountIcon from "@mui/icons-material/Discount";
import UndoIcon from "@mui/icons-material/Undo";
import { Box } from "@mui/material";
import Link from "next/link";
import React from 'react'

function BotonesNavAdmin() {
  return (
    <>
      <Box sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}>
        <Link href="/store/dashboard" className={navin.items}>
          <AddBusinessIcon className={navin.iconos} />
        </Link>
      </Box>
      <Box sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}>
        <Link href="/store/dashboard/categoria" className={navin.items}>
          <CategoryIcon className={navin.iconos} />
        </Link>
      </Box>
      <Box sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}>
        <Link href="/store/dashboard/usuarios" className={navin.items}>
          <GroupIcon className={navin.iconos} />
        </Link>
      </Box>
      <Box sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}>
        <Link href="/store/dashboard/pedidos" className={navin.items}>
          <DiscountIcon className={navin.iconos} />
        </Link>
      </Box>
      <Box sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}>
        <Link href="/store/home" className={navin.items}>
          <UndoIcon className={navin.iconos} />
        </Link>
      </Box>
    </>
  );
}

export default BotonesNavAdmin