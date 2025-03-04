"use client";
import React, { useRef } from "react";
import PropTypes from "prop-types";
import estilo from "../styles/auth.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import pro from "../styles/producto.module.css";
import {
  Button,
  Grid2,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import BurstModeIcon from "@mui/icons-material/BurstMode";
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

function ModalAdminPro({ open, handleClose, item }) {
  const { categoria, agregarProducto, categoriaId, editarProdcto } =
    useAdminStore();
  const data = {
    idproducto: item.idproducto,
    nombre: item.nombre,
    descripcion: item.descripcion,
    stock: item.stock,
    precio: item.precio,
    descuento: item.descuento,
    allImages: [
      item.foto1,
      item.foto2,
      item.foto3,
      item.foto4,
      item.foto5,
    ].filter(Boolean),
    newImages: [],
    sexo: item.sexo,
    categoria: item.categoria,
  };

  const fileref = useRef();

  const formik = useFormik({
    initialValues: data,
    enableReinitialize: true,
    validationSchema: Yup.object({
      nombre: Yup.string().required("Campo Requerido"),
      descripcion: Yup.string().required("Campo Requerido"),
      stock: Yup.number()
        .required("Campo Requerido")
        .min(1, "El stock debe ser mayor a 0"),
      precio: Yup.number()
        .required("Campo Requerido")
        .min(1, "Precio debe ser mayor a 0"),
      descuento: Yup.number()
        .required("Campo Requerido")
        .min(0, "Descuento debe ser 0 o mayor"),
      newImages: Yup.array()
        .of(
          Yup.mixed()
            .test("fileType", "Solo se permiten JPG", (value) => {
              if (!value) return true;
              return ["image/jpeg", "image/jpg"].includes(value.type);
            })
            .test("fileSize", "Tamaño máximo 2MB", (value) => {
              if (!value) return true;
              return value.size <= 2 * 1024 * 1024;
            })
        )
        .max(5, "Máximo 5 imágenes")
        .required("Debes subir al menos una imagen"),
      sexo: Yup.string().required("Campo Requerido"),
      categoria: Yup.string().required("Campo Requerido"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      const allImages =
        item.idproducto != ""
          ? [...values.allImages, ...values.newImages].slice(0, 5)
          : values.newImages;
      const nameCate = categoriaId(values.categoria);
      const result = {
        ...values,
        foto1: allImages[0],
        foto2: allImages[1],
        foto3: allImages[2],
        foto4: allImages[3],
        foto5: allImages[4],
        categoria: nameCate,
      };

      if (result.idproducto != "") {
        //edit
        const { allImages, newImages, ...edit } = result;
        const inf = editarProdcto(edit);
        if (inf) {
          Swal.fire("Sistema", "Producto Editado", "success");
        } else {
          Swal.fire("Sistema", "No se pudo editar", "error");
        }
      } else {
        //agregar
        const { allImages, newImages, ...nuevo } = result;
        const inf = agregarProducto(nuevo);
        if (inf) {
          Swal.fire("Sistema", "Producto Agregado", "success");
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
              Producto
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
                  name="idproducto"
                  placeholder="id"
                  value={formik.values.idproducto}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  error={formik.touched.idproducto && formik.errors.idproducto}
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
                  placeholder="Nombre"
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

            {/*descripcion */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del input */}
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  id="standard-descripcion"
                  autoComplete="true"
                  variant="standard"
                  type="text"
                  name="descripcion"
                  placeholder="Descripcion"
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  error={
                    formik.touched.descripcion && formik.errors.descripcion
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
            {/*campo del error del nombre */}
            {formik.touched.descripcion && formik.errors.descripcion && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.descripcion}
              </Typography>
            )}

            {/*stock */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del input */}
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  id="standard-stock"
                  autoComplete="true"
                  variant="standard"
                  type="number"
                  name="stock"
                  placeholder="Stock"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  error={formik.touched.stock && formik.errors.stock}
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
            {formik.touched.stock && formik.errors.stock && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.stock}
              </Typography>
            )}

            {/*precio */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del input */}
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  id="standard-precio"
                  autoComplete="true"
                  variant="standard"
                  type="number"
                  name="precio"
                  placeholder="Precio"
                  value={formik.values.precio}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  error={formik.touched.precio && formik.errors.precio}
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
            {formik.touched.precio && formik.errors.precio && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.precio}
              </Typography>
            )}

            {/*desc */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del input */}
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  id="standard-descuento"
                  autoComplete="true"
                  variant="standard"
                  type="number"
                  name="descuento"
                  placeholder="Descuento"
                  value={formik.values.descuento}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  margin="normal"
                  error={formik.touched.descuento && formik.errors.descuento}
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
            {formik.touched.descuento && formik.errors.descuento && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.descuento}
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
                  <MenuItem value={"Hombre"}>Hombre</MenuItem>
                  <MenuItem value={"Mujer"}>Mujer</MenuItem>
                  <MenuItem value={"Unisex"}>Unisex</MenuItem>
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
            {/*img */}
            <Grid2 container size={12} display="flex" justifyContent='center' alignItems="center">
              {/*campo del input */}
              <Grid2 size={12}>
                {item.idproducto != "" ? (
                  <Grid2
                    container
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    size={12}
                    spacing={1}
                    sx={{
                      marginTop: "10px",
                    }}
                  >
                    <Grid2 size={12} display='flex' justifyContent='center' alignItems='center'>
                      <Typography variant="h6" sx={{fontWeight:600, color:'red'}}>Imágenes</Typography>
                    </Grid2>
                    {formik.values.allImages.map((img, index) => (
                      <Grid2
                        container
                        spacing={1}
                        size={{ xs: 12, sm: 4 }}
                        key={index}
                      >
                        <img
                          src={img}
                          alt={`Imagen ${index + 1}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </Grid2>
                    ))}
                  </Grid2>
                ) : (
                  <>
                    <Grid2
                      size={12}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <IconButton
                        color="error"
                        onClick={() => fileref.current.click()}
                      >
                        <BurstModeIcon />
                      </IconButton>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Agregar Imagen
                      </Typography>
                    </Grid2>
                    <input
                      ref={fileref}
                      type="file"
                      multiple
                      accept=".jpg,.jpeg"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const files = Array.from(e.target.files).slice(0, 5);
                        console.log("Archivos seleccionados:", files); // Agrega este log
                        formik.setFieldValue("newImages", files);
                      }}
                    />
                    {/*previsualar imgs */}
                    <Grid2
                      container
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      size={12}
                      spacing={1}
                      sx={{
                        marginTop: "10px",
                      }}
                    >
                      {formik.values.newImages.map((file, index) => (
                        <Grid2
                          container
                          spacing={1}
                          size={{ xs: 12, sm: 4 }}
                          display='flex'
                          key={index}
                        >
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            style={{
                              width: 100,
                              height: 100,
                              objectFit: "cover",
                            }}
                          />
                          <Button
                            type="button"
                            sx={{
                              textTransform: "none",
                              color: "aqua",
                              fontWeight: 600,
                              "&:hover": {
                                color: "white",
                              },
                            }}
                            onClick={() => {
                              const newFiles = [...formik.values.newImages];
                              newFiles.splice(index, 1);
                              formik.setFieldValue("newImages", newFiles);
                              formik.setFieldTouched("newImages", true, false); // Forzar validación
                            }}
                          >
                            Eliminar
                          </Button>
                        </Grid2>
                      ))}
                    </Grid2>
                  </>
                )}
              </Grid2>
            </Grid2>
            {formik.touched.newImages && formik.errors.newImages && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.newImages}
              </Typography>
            )}

            {/*campo del categoria */}
            <Grid2 container size={12} display="flex" alignItems="flex-end">
              {/*campo del input */}
              <Grid2 size={12}>
                <TextField
                  fullWidth
                  select
                  id="filled-select-cate"
                  autoComplete="true"
                  variant="filled"
                  label="Categoria"
                  name="categoria"
                  value={formik.values.categoria}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.categoria && formik.errors.categoria}
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
                  {categoria.map((cat) => (
                    <MenuItem key={cat.idcategoria} value={cat.nombre}>
                      {cat.nombre}
                    </MenuItem>
                  ))}
                  ;
                </TextField>
              </Grid2>
            </Grid2>
            {/*mensaje de error de sexo */}
            {formik.touched.categoria && formik.errors.categoria && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                {formik.errors.categoria}
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

ModalAdminPro.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.object,
};

export default ModalAdminPro;
