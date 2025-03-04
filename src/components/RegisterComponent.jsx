import React, { useState } from "react";
import estilo from "../styles/auth.module.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Link from "next/link";
import PropTypes from "prop-types";

function RegisterComponent({ onSubmit }) {
  const registra = {
    nombres: "",
    apellidos: "",
    telefono: "",
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: registra,
    validationSchema: Yup.object({
      nombres: Yup.string().required("Campo Requerido"),
      apellidos: Yup.string()
        .required("Campo Requerido")
        .matches(/^\S+\s+\S+$/, "Debe ingresar tus dos apellidos"),
      telefono: Yup.string()
        .matches(/^\d{9}$/, "Debe tener exactamente 9 dígitos")
        .required("Campo Requerido"),
      email: Yup.string().email("Email inválido").required("Campo Requerido"),
      password: Yup.string()
        .min(10, "Mínimo 10 caracteres")
        .matches(/[A-Z]/, "Debe contener letra mayúscula")
        .matches(/[0-9]/, "Debe contener número")
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          "Debe contener un carácter especial"
        )
        .required("Campo Requerido"),
    }),
    onSubmit,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <Typography
        variant="h5"
        sx={{ mb: 0, color: "white", fontWeight: "600", fontSize: "1.8rem" }}
      >
        Registrar Usuario
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        {/*campo del nombres */}
        <Grid2 container size={12} display="flex" alignItems="flex-end">
          {/*campo del icon */}
          <Grid2
            size={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <PersonIcon
              sx={{ color: "white", mr: 1.5, pb: 2.0, scale: 1.25 }}
            />
          </Grid2>
          {/*campo del input */}
          <Grid2 size={11}>
            <TextField
              fullWidth
              id="standard-nombres"
              autoComplete="true"
              variant="standard"
              type="text"
              name="nombres"
              placeholder="Nombres"
              value={formik.values.nombres}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              margin="normal"
              error={formik.touched.nombres && formik.errors.nombres}
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
                  padding: "2px 20px",
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
        {formik.touched.nombres && formik.errors.nombres && (
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600", color: "red" }}
          >
            {formik.errors.nombres}
          </Typography>
        )}

        {/*campo del apellidos */}
        <Grid2 container size={12} display="flex" alignItems="flex-end">
          {/*campo del icon */}
          <Grid2
            size={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <PersonIcon
              sx={{ color: "white", mr: 1.5, pb: 2.0, scale: 1.25 }}
            />
          </Grid2>
          {/*campo del input */}
          <Grid2 size={11}>
            <TextField
              fullWidth
              id="standard-apellidos"
              autoComplete="true"
              variant="standard"
              type="text"
              name="apellidos"
              placeholder="Apellidos"
              value={formik.values.apellidos}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              margin="normal"
              error={formik.touched.apellidos && formik.errors.apellidos}
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
                  padding: "2px 20px",
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
        {formik.touched.apellidos && formik.errors.apellidos && (
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600", color: "red" }}
          >
            {formik.errors.apellidos}
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
              sx={{ color: "white", mr: 1.5, pb: 1.8, scale: 1.25 }}
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
              error={formik.touched.telefono && formik.errors.telefono}
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
                  padding: "2px 20px",
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
        {formik.touched.telefono && formik.errors.telefono && (
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600", color: "red" }}
          >
            {formik.errors.telefono}
          </Typography>
        )}

        {/*campo del email */}
        <Grid2 container size={12} display="flex" alignItems="flex-end">
          {/*campo del icon */}
          <Grid2
            size={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <AlternateEmailIcon
              sx={{ color: "white", mr: 1.5, pb: 1.8, scale: 1.25 }}
            />
          </Grid2>
          {/*campo del input */}
          <Grid2 size={11}>
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
                  padding: "2px 20px",
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
          display="flex"
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
                  padding: "2px 20px",
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
                  sx={{ color: "white", ml: 1.5, pb: 1, scale: 1.25 }}
                />
              ) : (
                <Visibility
                  sx={{ color: "white", ml: 1.5, pb: 1, scale: 1.25 }}
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

        {/*login boton */}
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          fullWidth
          sx={{
            mt: 2,
            mb: 2,
            py: 1.2,
            fontSize: "1rem",
            color: "white",
            borderRadius: "30px",
            border: "4px solid aqua",
            fontWeight: "bold",
            "&:hover": {
              boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.8)",
              backgroundColor: "aqua",
              color: "black",
            },
          }}
        >
          Crear Usuario
        </Button>
      </form>
      {/*link de retorno */}
      <Grid2 container size={12} sx={{ justifyContent: "center" }}>
        <Link
          href="/store/auth/login"
          prefetch={true}
          underline="hover"
          className={estilo.links}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "550" }}>
            Ir al Login
          </Typography>
        </Link>
      </Grid2>
    </>
  );
}

RegisterComponent.propTypes = {
  onSubmit: PropTypes.any,
};

export default RegisterComponent;
