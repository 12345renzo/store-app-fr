import { Button, Grid2, Typography } from "@mui/material";
import React from "react";
import pro from "../styles/producto.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import useProductoStore from "@/hooks/useProductoStore";
import Swal from "sweetalert2";
import useAuthStore from "@/hooks/useAuthStore";

function PedidoItem({ pedido }) {
  const { generarPDF, eliminarPedido } = useProductoStore();
  const { id } = useAuthStore(); 

  const genera = () => {
    generarPDF({pedido: pedido.idpedido});
  };
  const eliminar = async () => {
    const resultado = await eliminarPedido({ ids: pedido.idpedido });

    if (resultado) {
      Swal.fire("Sistema", "Eliminado Correctamente", "success");
    } else {
      Swal.fire("Sistema", "No se pudo Eliminar", "error");
    }
  };

  return (
    <Grid2
      container
      size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
      sx={{ border: "3px solid aqua", p: "15px", borderRadius: "10px" }}
    >
      <Grid2 size={12}>
        <Typography variant="h6" className={pro.resu}>
          Reporte de Pedido
        </Typography>
      </Grid2>
      <Grid2 size={12} my={2}>
        <Typography variant="subtitle2">
          <span className={pro.resu}>Fecha: </span>
          {pedido.detalles[0]?.pedido.fecha}
        </Typography>
        <Typography variant="subtitle2">
          <span className={pro.resu}>Fecha Entrega: </span>
          {pedido.detalles[0]?.pedido.fechaEntrega}
        </Typography>
        <Typography variant="subtitle2">
          <span className={pro.resu}>Total: </span>
          {pedido.detalles[0]?.pedido.total}
        </Typography>
        <Typography variant="subtitle2">
          <span className={pro.resu}>Estado: </span>
          {pedido.detalles[0]?.pedido.estado}
        </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Button className={pro.especial} onClick={genera}>
          Ver Boleta
        </Button>
      </Grid2>
      {pedido.detalles[0]?.pedido.estado == "Entregado" ||
      pedido.detalles[0]?.pedido.estado == "Cancelado" ? (
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Button className={pro.especial} onClick={eliminar}>
            <DeleteIcon color="error" />
          </Button>
        </Grid2>
      ) : (
        ""
      )}
    </Grid2>
  );
}

export default PedidoItem;
