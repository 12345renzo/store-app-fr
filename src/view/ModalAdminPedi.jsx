"use client";
import useAdminStore from "@/hooks/useAdminStore";
import { useFormik } from "formik";
import estilo from "../styles/auth.module.css";
import pro from "../styles/producto.module.css";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as Yup from "yup";
import React from "react";
import {
  Button,
  Grid2,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "black",
  color: "white",
  border: "4px solid aqua",
  boxShadow: 24,
  p: 4,
};

function ModalAdminPedi({ open, handleClose, item }) {
  const {editPedido} = useAdminStore();

  const data = {
    idpedido: item.idpedido,
    fecha: item.fecha,
    subtotal: item.subtotal,
    igv: item.igv,
    total: item.total,
    usuario: item.usuario,
    descuento: item.descuento,
    fechaEntrega: item.fechaEntrega,
    estado: item.estado,
  };

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validationSchema: Yup.object({
      estado: Yup.string().required("Campo Requerido"),
    }),
    onSubmit: (values, { setSubmitting }) => {
     const rpte = editPedido({datos:values});
      if (rpte) {
        Swal.fire("Sistema", "Pedido Editado", "success");
      } else {
        Swal.fire("Sistema", "Error Al Editar", "error");
      }
      setTimeout(() => {
        setSubmitting(false);
      }, 1500);
      salir();
    },
  });

  const salir = () => {
    formik.resetForm();
    handleClose();
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <Grid2
          container
          size={12}
          spacing={4}
          sx={(theme) => ({
            ...style,
            width: "100%",
            maxWidth: 1200,
            maxHeight: "80vh",
            overflow: "auto",

            [theme.breakpoints.down("xl")]: {
              maxWidth: 900,
            },
            [theme.breakpoints.down("lg")]: {
              maxWidth: 700,
            },
            [theme.breakpoints.down("md")]: {
              maxWidth: 500,
              maxHeight: "80vh",
              //overflow: "auto",
            },
            [theme.breakpoints.down("sm")]: {
              maxWidth: "90%",
              maxHeight: "85vh",
              //overflow: "auto",
            },
          })}
        >
          <Grid2
            size={12}
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4" className={pro.resu}>
              Pedido
            </Typography>
          </Grid2>

          {/*estado */}
          <Grid2
            container
            size={12}
            display="flex"
            alignItems="flex-end"
          >
            {/*campo del input */}
            <Grid2 size={12}>
              <TextField
                fullWidth
                select
                id="filled-select-estado"
                autoComplete="true"
                variant="filled"
                label="estado"
                name="estado"
                value={formik.values.estado}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.estado && formik.errors.estado}
                margin="normal"
                SelectProps={{
                  displayEmpty: true, // Permite mostrar un texto cuando no hay selección
                }}
                InputProps={{
                  className: estilo.inputField,
                }}
                InputLabelProps={{
                  className: estilo.inputLabel,
                }}
                sx={{
                  "& .MuiInputBase-root": {
                    backgroundColor: "transparent",
                    border: "5px solid aqua",
                    borderRadius: "10px",
                    padding: "5px 20px",
                    transition: "0.3s all ease",
                    "&.Mui-focused": {
                      backgroundColor: "white",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                    px: "0",
                    pt: "8px",
                    "&:focus": {
                      color: "black",
                      boxShadow: "0 0 3px rgba(255, 255, 255, 0.5)",
                    },
                  },
                }}
              >
                <MenuItem value={"Pedido"}>Pedido</MenuItem>
                <MenuItem value={"Enviado"}>Enviado</MenuItem>
                <MenuItem value={"Entregado"}>Entregado</MenuItem>
                <MenuItem value={"Cancelado"}>Cancelado</MenuItem>
              </TextField>
            </Grid2>
          </Grid2>
          {/*campo del error del estado */}
          {formik.touched.estado && formik.errors.estado && (
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "600", color: "red" }}
            >
              {formik.errors.estado}
            </Typography>
          )}

          <Grid2
            container
            spacing={3}
            size={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            my={2}
          >
            <Button
              color="primary"
              type="submit"
              className={pro.especial}
              disabled={formik.isSubmitting}
            >
              <SendIcon /> Enviar
            </Button>
            <Button color="error" onClick={salir} className={pro.especial}>
              <ArrowBackIcon />
              Cancelar
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Modal>
  );
}

export default ModalAdminPedi;
