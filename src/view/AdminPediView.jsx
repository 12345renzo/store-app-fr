"use client";
import TablaComponent from "@/components/TablaComponent";
import useAdminStore from "@/hooks/useAdminStore";
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalAdminPedi from "./ModalAdminPedi";
import useProductoStore from "@/hooks/useProductoStore";

function AdminPediView({ buscar }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setopen] = useState(false);

  //traer la lista de pedidos el edit y el imprent boleto
  const { pedido, countP, cargarTablaPedido } = useAdminStore();
  const { eliminarPedido, generarPDF } = useProductoStore();
  //efect de carga de tabla
  useEffect(() => {
    cargarTablaPedido({ bus: buscar, page: page + 1, limit: rowsPerPage });
  }, [buscar, page, rowsPerPage]);

  const cabecera = [
    { key: "idpedido", label: "Codigo", align: "center" },
    { key: "fecha", label: "Fecha", align: "center" },
    { key: "subtotal", label: "Subtotal", align: "center" },
    { key: "igv", label: "Igv", align: "center" },
    { key: "total", label: "Total", align: "center" },
    { key: "usuario", label: "Usuario", align: "center" },
    { key: "descuento", label: "Descuento", align: "center" },
    { key: "fechaEntrega", label: "Entrega", align: "center" },
    { key: "estado", label: "Estado", align: "center" },
  ];

  const handleClose = () => setopen(false);
  const [datos, setdatos] = useState({});

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
          eliminarPedido({ids: item.idpedido});
          Swal.fire("Eliminado", "La categoria ha sido eliminado.", "success");
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar la categoria.", "error");
        }
      }
    });
  };

  return (
    <Container maxWidth="xl" sx={{ p: "0 0 40px 0" }}>
      <TablaComponent
        data={pedido}
        headers={cabecera}
        onEdit={handleEdit}
        onDelete={handleDelete}
        keyProp="idpedido"
        totalItems={countP}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />

      <ModalAdminPedi open={open} handleClose={handleClose} item={datos} />
    </Container>
  );
}

export default AdminPediView;
