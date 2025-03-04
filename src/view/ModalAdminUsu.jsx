"use client";
import useAdminStore from "@/hooks/useAdminStore";
import useAuthStore from "@/hooks/useAuthStore";
import { useFormik } from "formik";
import estilo from "../styles/auth.module.css";
import pro from "../styles/producto.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as Yup from "yup";
import React, { useState } from "react";
import {
  Button,
  Grid2,
  IconButton,
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

function ModalAdminUsu({ open, handleClose, item }) {
  const { agregarUsuario, cargarTablaUsuarios } = useAdminStore();
  const { editUser } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const data = {
    idusuario: item.idusuario,
    nombre: item.nombre,
    apellido: item.apellido,
    telefono: item.telefono,
    email: item.email,
    password: item.password,
    edad: item.edad,
    sexo: item.sexo,
    direccion: item.direccion,
    rol: item.rol,
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
      email: Yup.string().email("Email inválido").required("Campo Requerido"),
      password: Yup.string()
        .min(10, "Mínimo 10 caracteres")
        .matches(/[A-Z]/, "Debe contener letra mayúscula")
        .matches(/[0-9]/, "Debe contener número")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener un carácter especial")
        .required("Campo Requerido"),
      rol: Yup.string().required("Campo Requerido"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      let valor;
      const { idusuario: id, ...resto } = values;
      const nuevoUsuario = { id, ...resto };
      if (values.idusuario != "") {
        if (nuevoUsuario.rol == "Usuario") {
          valor = { ...nuevoUsuario, rol: 1 };
        } else {
          valor = { ...nuevoUsuario, rol: 2 };
        }

        const rpte = editUser({ datos: valor });

        if (rpte) {
          cargarTablaUsuarios({ bus: "", page: 1, limit: 10 });
          Swal.fire("Sistema", "Usuario Editado", "success");
        } else {
          Swal.fire("Sistema", "Error Al Editar", "error");
        }
      } else {
        if (values.rol == "Usuario") {
          valor = { ...values, rol: 3 };
        } else {
          valor = { ...values, rol: 4 };
        }

        agregarUsuario(valor);
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
              Usuario
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

            {/*campo del apellido */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del input */}
              <Grid2 size={12}>
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
              {/*campo del input */}
              <Grid2 size={12}>
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

            {/*campo del email */}
            <Grid2
              container
              size={12}
              display={data.idusuario == "" ? "flex" : "none"}
              alignItems="flex-end"
            >
              {/*campo del input */}
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  id="standard-email"
                  autoComplete="true"
                  variant="standard"
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  error={formik.touched.email && formik.errors.email}
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
            {/*campo del error del password */}
            {formik.touched.email && formik.errors.email && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.email}
              </Typography>
            )}

            {/*campo del password */}
            <Grid2
              container
              size={12}
              sx={{ mb: 2 }}
              display={data.idusuario == "" ? "flex" : "none"}
              alignItems="flex-end"
            >
              {/*campo del input */}
              <Grid2 size={11}>
                <TextField
                  fullWidth
                  id="standard-password"
                  autoComplete="true"
                  variant="standard"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  error={formik.touched.password && formik.errors.password}
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
              {/*campo del icon */}
              <Grid2
                size={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <IconButton
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? (
                    <VisibilityOff
                      sx={{
                        color: "white",
                        ml: 1.5,
                        mb: 1.5,
                        pb: 1,
                        scale: 1.5,
                      }}
                    />
                  ) : (
                    <Visibility
                      sx={{
                        color: "white",
                        ml: 1.5,
                        mb: 1.5,
                        pb: 1,
                        scale: 1.5,
                      }}
                    />
                  )}
                </IconButton>
              </Grid2>
            </Grid2>
            {/*campo del error del password */}
            {formik.touched.password && formik.errors.password && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.password}
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
            {/*campo del rol */}
            <Grid2
              container
              size={12}
              display={data.idusuario == "" ? "flex" : "none"}
              alignItems="flex-end"
            >
              {/*campo del input */}
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  select
                  id="filled-select-rol"
                  autoComplete="true"
                  variant="filled"
                  label="Rol"
                  name="rol"
                  value={formik.values.rol}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.rol && formik.errors.rol}
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
                  <MenuItem value={"Usuario"}>Usuario</MenuItem>
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                </TextField>
              </Grid2>
            </Grid2>
            {/*mensaje de error de sexo */}
            {formik.touched.rol && formik.errors.rol && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.rol}
              </Typography>
            )}

            {/*campo del edad */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del input */}
              <Grid2 size={12}>
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
              {/*campo del input */}
              <Grid2 size={12}>
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
              {/*campo del input */}
              <Grid2 size={12}>
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

export default ModalAdminUsu;
