"use client";
import TablaComponent from "@/components/TablaComponent";
import useAdminStore from "@/hooks/useAdminStore";
import { Button, Container, Grid2 } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import navin from "../styles/nav.module.css";
import ModalAdminPro from "./ModalAdminPro";
import Swal from "sweetalert2";

function AdminProView({ buscar }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setopen] = useState(false);
  const { cargarTablaProducto, cargarTablaCategoria, producto, count, eliminarProducto } =
    useAdminStore();

  useEffect(() => {
    cargarTablaCategoria({ bus: "", page: 1, limit: 100 });
  }, []);

  useEffect(() => {
    cargarTablaProducto({ bus: buscar, page: page + 1, limit: rowsPerPage });
  }, [page, rowsPerPage, buscar]);

  const cabeceras = [
    { key: "idproducto", label: "Codigo", align: "center" },
    { key: "nombre", label: "Producto", align: "center" },
    { key: "descripcion", label: "Detalle", align: "center" },
    { key: "stock", label: "Stock", align: "center" },
    { key: "precio", label: "Precio", align: "center" },
    { key: "descuento", label: "Desc.", align: "center" },
    { key: "foto1", label: "Imagen", align: "center" },
    { key: "sexo", label: "Sexo", align: "center" },
    { key: "categoria", label: "Categoria", align: "center" },
  ];

  const handleClose = () => setopen(false);
  const [datos, setdatos] = useState({});

  const dat = {
    idproducto: "",
    nombre: "",
    descripcion: "",
    stock: "",
    precio: "",
    descuento: "",
    foto1: "",
    foto2: "",
    foto3: "",
    foto4: "",
    foto5: "",
    sexo: "Hombre",
    categoria: "zapato",
  };

  const handleNew = () => {
    setdatos(dat);
    setopen(true);
  };
  const handleEdit = (item) => {
    setdatos({ ...item });
    setopen(true);
  };
  const handleDelete = (item) => {
    console.log("delete");
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "No, cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const rpta = eliminarProducto(item);
          Swal.fire("Eliminado", "El producto ha sido eliminado.", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar el producto.", "error");
        }
      }
    });
  };
  return (
    <Container maxWidth="xl" sx={{ p: "0 0 40px 0" }}>
      <Grid2
        container
        size={{ sm: 6, xs: 12 }}
        display="flex"
        justifyContent="start"
        alignItems="center"
        m="0 0 10px 0"
      >
        <Button
          className={navin.boton}
          sx={{
            border: "3px solid transparent",
            borderRadius: "25px",
            textDecoration: "none",
            textTransform: "none",
            color: "aqua",
            fontWeight: 600,
          }}
          onClick={handleNew}
        >
          <PlusOneIcon sx={{ color: "aqua" }} />
          &nbsp; Agregar
        </Button>
      </Grid2>
      {/* Tabla de usuarios */}
      <TablaComponent
        data={producto}
        headers={cabeceras}
        onEdit={handleEdit}
        keyProp="idproducto"
        onDelete={handleDelete}
        totalItems={count}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />
      <ModalAdminPro open={open} handleClose={handleClose} item={datos} />
    </Container>
  );
}
export default AdminProView;
