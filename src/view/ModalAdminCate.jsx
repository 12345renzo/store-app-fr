"use client";
import React from "react";
import estilo from "../styles/auth.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pro from "../styles/producto.module.css";
import {
  Button,
  Grid2,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import useAdminStore from "@/hooks/useAdminStore";
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
function ModalAdminCate({ open, handleClose, item }) {
  const { agregarCategoria, editarCategoria } = useAdminStore();

  const data = {
    idcategoria: item.idcategoria,
    nombre: item.nombre,
  };

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validationSchema: Yup.object({
      nombre: Yup.string().required("Campo Requerido"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      if (values.idcategoria != "") {
        const inf = editarCategoria(values);
        if (inf) {
          Swal.fire("Sistema", "Categoria Editado", "success");
        } else {
          Swal.fire("Sistema", "No se pudo editar", "error");
        }
      } else {
        const inf = agregarCategoria(values.nombre);
        if (inf) {
          Swal.fire("Sistema", "Categoria Agregado", "success");
        } else {
          Swal.fire("Sistema", "No se pudo agregar", "error");
        }
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
              Categoria
            </Typography>
          </Grid2>

          <Grid2
            container
            spacing={0}
            size={12}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            {/*id */}
            <Grid2 container size={12} display="none" alignItems="flex-end">
              {/*campo del input */}
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  id="standard-id"
                  autoComplete="true"
                  variant="standard"
                  type="text"
                  name="idcategoria"
                  placeholder="id"
                  value={formik.values.idcategoria}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  error={
                    formik.touched.idcategoria && formik.errors.idcategoria
                  }
                  InputProps={{
                    className: estilo.inputField,
                  }}
                  InputLabelProps={{
                    className: estilo.inputLabel,
                  }}
                  sx={{
                    "& .MuiInput-root": {
                      backgroundColor: "transparent",
                      border: "5px solid aqua",
                      borderRadius: "10px",
                      padding: "8px 20px",
                      transition: "0.3s all ease",
                      "&.Mui-focused": {
                        backgroundColor: "white",
                      },
                    },
                    "& .MuiInput-input": {
                      "&:focus": {
                        color: "black",
                        boxShadow: "0 0 3px rgba(255, 255, 255, 0.5)",
                      },
                    },
                  }}
                />
              </Grid2>
            </Grid2>

            {/*nombre */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del input */}
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  id="standard-nombre"
                  autoComplete="true"
                  variant="standard"
                  type="text"
                  name="nombre"
                  placeholder="nombre"
                  value={formik.values.nombre}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  error={formik.touched.nombre && formik.errors.nombre}
                  InputProps={{
                    className: estilo.inputField,
                  }}
                  InputLabelProps={{
                    className: estilo.inputLabel,
                  }}
                  sx={{
                    "& .MuiInput-root": {
                      backgroundColor: "transparent",
                      border: "5px solid aqua",
                      borderRadius: "10px",
                      padding: "8px 20px",
                      transition: "0.3s all ease",
                      "&.Mui-focused": {
                        backgroundColor: "white",
                      },
                    },
                    "& .MuiInput-input": {
                      "&:focus": {
                        color: "black",
                        boxShadow: "0 0 3px rgba(255, 255, 255, 0.5)",
                      },
                    },
                  }}
                />
              </Grid2>
            </Grid2>
            {/*campo del error del nombre */}
            {formik.touched.nombre && formik.errors.nombre && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.nombre}
              </Typography>
            )}
          </Grid2>

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

export default ModalAdminCate;
