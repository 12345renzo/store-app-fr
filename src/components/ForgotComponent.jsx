import React, { useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  Grid2,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import estilo from "../styles/auth.module.css";
import { AccountCircle } from "@mui/icons-material";
import PropTypes from "prop-types";

function ForgotComponent({ onSubmit }) {
  const datos = {
    email: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: datos,
    validationSchema: Yup.object({
      email: Yup.string().email("Email inválido").required("Campo Requerido"),
      password: Yup.string()
        .min(10, "Mínimo 10 caracteres")
        .matches(/[A-Z]/, "Debe contener letra mayúscula")
        .matches(/[0-9]/, "Debe contener número")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Debe contener un carácter especial")
        .required("Campo Requerido"),
    }),
    onSubmit: onSubmit,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <>
      <Typography
        variant="h5"
        sx={{ mb: 0, color: "white", fontWeight: "600", fontSize: "1.8rem" }}
      >
        Cambiar Clave
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/*campo del email */}
        <Grid2 container size={12} display="flex" alignItems="flex-end">
          {/*campo del icon */}
          <Grid2
            size={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <AccountCircle
              sx={{ color: "white", mr: 1.5, pb: 2.5, scale: 1.25 }}
            />
          </Grid2>
          {/*campo del input */}
          <Grid2 size={11}>
            <TextField
              fullWidth
              id="standard-email"
              autoComplete="true"
              variant="standard"
              placeholder="Usuario"
              type="text"
              name="email"
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
        {/*campo del error del email */}
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
                  sx={{ color: "white", ml: 1.5, pb: 2, scale: 1.25 }}
                />
              ) : (
                <Visibility
                  sx={{ color: "white", ml: 1.5, pb: 2, scale: 1.25 }}
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
            mb: 3,
            py: 1.2,
            fontSize: "1.08rem",
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
          Cambiar
        </Button>
      </form>

      {/*link de cambio */}
      <Grid2 container size={12} sx={{ justifyContent: "center" }}>
        <Link
          href="/store/auth/login"
          underline="hover"
          className={estilo.links}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "550" }}>
            Regresar
          </Typography>
        </Link>
      </Grid2>
    </>
  );
}

ForgotComponent.propTypes = {
  onSubmit: PropTypes.any,
};

export default ForgotComponent;
