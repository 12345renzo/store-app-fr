"use client";
import useAdminStore from "@/hooks/useAdminStore";
import { Button, Container, Grid2 } from "@mui/material";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import navin from "../styles/nav.module.css";
import React, { useEffect, useState } from "react";
import TablaComponent from "@/components/TablaComponent";
import ModalAdminUsu from "./ModalAdminUsu";
import Swal from "sweetalert2";

function AdminUserView({ buscar }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setopen] = useState(false);

  const { usuario, cargarTablaUsuarios, countU, eliminarUsuario } = useAdminStore();

  useEffect(() => {
    cargarTablaUsuarios({ bus: buscar, page: page + 1, limit: rowsPerPage });
  }, [buscar, page, rowsPerPage]);

  const cabecera = [
    { key: "idusuario", label: "Codigo", align: "center" },
    { key: "nombre", label: "Nombre", align: "center" },
    { key: "apellido", label: "Apellido", align: "center" },
    { key: "telefono", label: "Telefono", align: "center" },
    { key: "email", label: "Correo", align: "center" },
    { key: "edad", label: "Edad", align: "center" },
    { key: "sexo", label: "Sexo", align: "center" },
    { key: "direccion", label: "Direccion", align: "center" },
    { key: "rol", label: "Rol", align: "center" },
  ];

  const handleClose = () => setopen(false);
  const [datos, setdatos] = useState({});

  const dat = {
    idusuario: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    password: "",
    edad: "",
    sexo: "",
    direccion: "",
    rol: "",
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
         eliminarUsuario(item.idusuario);
          Swal.fire("Eliminado", "La categoria ha sido eliminado.", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar la categoria.", "error");
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

      <TablaComponent
        data={usuario}
        headers={cabecera}
        onEdit={handleEdit}
        onDelete={handleDelete}
        keyProp="idusuario"
        totalItems={countU}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />

      <ModalAdminUsu open={open} handleClose={handleClose} item={datos} />
    </Container>
  );
}

export default AdminUserView;
