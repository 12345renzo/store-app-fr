import React from "react";
import PropTypes from "prop-types";
import estilo from "../styles/auth.module.css";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import SendIcon from "@mui/icons-material/Send";
import WcIcon from "@mui/icons-material/Wc";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pro from "../styles/producto.module.css";
import {
  Button,
  Grid2,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "@/hooks/useAuthStore";
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

function ModalPerfil({ open, handleClose }) {

  const {user, editUser} = useAuthStore();

  const data = {
    nombre: user.nombre,
    apellido: user.apellido,
    telefono: user.telefono,
    edad: user.edad,
    sexo: user.sexo,
    direccion: user.direccion,
  };

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validationSchema: Yup.object({
      nombre: Yup.string().required("Campo Requerido"),
      apellido: Yup.string()
        .required("Campo Requerido")
        .matches(/^\S+\s+\S+$/, "Debe ingresar tus dos apellido"),
      telefono: Yup.string()
        .matches(/^\d{9}$/, "Debe tener exactamente 9 dígitos")
        .required("Campo Requerido"),
      edad: Yup.number()
        .min(17, "Tienes que ser mayor de edad")
        .required("Campo Requerido"),
      sexo: Yup.string().required("Campo Requerido"),
      direccion: Yup.string().required("Campo Requerido"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      const nueva = { ...values, id: user.idusuario };
      const reto = editUser({ datos: nueva });
      salir();
      if (reto) {
        Swal.fire("Sistema", "Editado Correctamente", "success");
      } else {
        Swal.fire("Sistema", "Error al Editar", "error");
      }
      setTimeout(() => {
        setSubmitting(false);
      }, 1500);
    },
  });

  const salir = () => {
    formik.resetForm();
    handleClose();
  }

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
          {/* titulo del model */}
          <Grid2
            size={12}
            container
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Typography variant="h4" className={pro.resu}>
              Datos Personales
            </Typography>
          </Grid2>

          {/*primer parte */}
          <Grid2
            container
            spacing={0}
            size={{ xs: 12, md: 6 }}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            {/*nombre */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del icon */}
              <Grid2
                size={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <PersonIcon
                  sx={{ color: "white", mr: 1.5, pb: 2.0, scale: 3.25 }}
                />
              </Grid2>
              {/*campo del input */}
              <Grid2 size={11}>
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

            {/*campo del apellido */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del icon */}
              <Grid2
                size={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <PersonIcon
                  sx={{ color: "white", mr: 1.5, pb: 2.0, scale: 3.25 }}
                />
              </Grid2>
              {/*campo del input */}
              <Grid2 size={11}>
                <TextField
                  fullWidth
                  id="standard-apellido"
                  autoComplete="true"
                  variant="standard"
                  type="text"
                  name="apellido"
                  placeholder="apellido"
                  value={formik.values.apellido}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  error={formik.touched.apellido && formik.errors.apellido}
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
            {/*campo del error del apellido */}
            {formik.touched.apellido && formik.errors.apellido && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.apellido}
              </Typography>
            )}

            {/*campo del telefono */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del icon */}
              <Grid2
                size={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <LocalPhoneIcon
                  sx={{ color: "white", mr: 1.5, pb: 1.8, scale: 3.25 }}
                />
              </Grid2>
              {/*campo del input */}
              <Grid2 size={11}>
                <TextField
                  fullWidth
                  id="standard-telefono"
                  autoComplete="true"
                  variant="standard"
                  type="text"
                  name="telefono"
                  placeholder="Telefono"
                  value={formik.values.telefono}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  //error={formik.touched.telefono && formik.errors.telefono}
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
            {/*campo del error del telefono */}
            {formik.touched.telefono && formik.errors.telefono && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.telefono}
              </Typography>
            )}
          </Grid2>

          {/*segunda parte */}
          <Grid2
            container
            spacing={0}
            size={{ xs: 12, md: 6 }}
            display="flex"
            justifyContent="center"
            alignContent="center"
          >
            {/*campo del edad */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del icon */}
              <Grid2
                size={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <PermContactCalendarIcon
                  sx={{ color: "white", mr: 1.5, pb: 1.8, scale: 3.25 }}
                />
              </Grid2>
              {/*campo del input */}
              <Grid2 size={11}>
                <TextField
                  fullWidth
                  id="standard-edad"
                  autoComplete="true"
                  variant="standard"
                  type="number"
                  name="edad"
                  placeholder="Edad"
                  value={formik.values.edad}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  error={formik.touched.edad && formik.errors.edad}
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
            {/*error de edad */}
            {formik.touched.edad && formik.errors.edad && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.edad}
              </Typography>
            )}

            {/*campo del sexo */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del icon */}
              <Grid2
                size={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <WcIcon
                  sx={{ color: "white", mr: 1.5, pb: 1.8, scale: 3.25 }}
                />
              </Grid2>
              {/*campo del input */}
              <Grid2 size={11}>
                <TextField
                  fullWidth
                  select
                  id="filled-select-sexo"
                  autoComplete="true"
                  variant="filled"
                  label="Sexo"
                  name="sexo"
                  value={formik.values.sexo}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.sexo && formik.errors.sexo}
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
                  <MenuItem value={"M"}>Masculino</MenuItem>
                  <MenuItem value={"F"}>Femenino</MenuItem>
                </TextField>
              </Grid2>
            </Grid2>
            {/*mensaje de error de sexo */}
            {formik.touched.sexo && formik.errors.sexo && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.sexo}
              </Typography>
            )}

            {/*campo del direccion */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del icon */}
              <Grid2
                size={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <PermContactCalendarIcon
                  sx={{ color: "white", mr: 1.5, pb: 1.8, scale: 3.25 }}
                />
              </Grid2>
              {/*campo del input */}
              <Grid2 size={11}>
                <TextField
                  fullWidth
                  id="standard-direc"
                  autoComplete="true"
                  variant="standard"
                  type="text"
                  name="direccion"
                  placeholder="Direccion"
                  value={formik.values.direccion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  error={formik.touched.direccion && formik.errors.direccion}
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
            {/*mensaje de error de direccion */}
            {formik.touched.direccion && formik.errors.direccion && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.direccion}
              </Typography>
            )}
          </Grid2>

          {/*botones */}
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
            <Button
              color="error"
              onClick={salir}
              className={pro.especial}
            >
              <ArrowBackIcon />
              Cancelar
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Modal>
  );
}

ModalPerfil.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ModalPerfil;
