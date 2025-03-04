import {
  Button,
  ButtonBase,
  FormControl,
  Grid2,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import pro from "../styles/producto.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import useProductoStore from "@/hooks/useProductoStore";

//estilo del cuadro
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "3px solid aqua",
    fontSize: 16,
    padding: "5px 26px 5px 8px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

function CarritoItem({ carro }) {
  const [contador, setcontador] = useState(carro.cantidad);
  const [modelo, setmodelo] = useState(carro.talla);
  const { ActualizarCarrito, EliminarItemCarrito } = useProductoStore();
  const handleModelo = (event) => {
    const valor = event.target.value;
    setmodelo(valor);
  };

  useEffect(() => {
    const carroup = { ...carro, talla: modelo, cantidad: contador };
    ActualizarCarrito({ carro: carroup });
  }, [modelo, contador]);

  return (
    <>
      {/*aki la img del producto del carro */}
      <Grid2
        size={{ xs: 12, sm: 3 }}
        p="10px"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ButtonBase>
          <img alt="complex" width="100%" height="150px" src={carro.foto1} />
        </ButtonBase>
      </Grid2>

      {/*aki va el cuerpo de cada targeta */}
      <Grid2
        size={{ xs: 12, sm: 9 }}
        container
        display="flex"
        justifyContent="space-around"
        alignItems="start"
      >
        <Grid2 size={9} container px="20px" pb="15px">
          <Grid2 size={12}>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className={pro.resu}
            >
              {carro.nombre}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              {carro.descripcion}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              ID: {carro.idproducto}
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
              {carro.descuento == 0
                ? "Desc: No Tiene"
                : `Desc: -${parseInt(carro.descuento)}%`}
            </Typography>
          </Grid2>
          <Grid2
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            flexWrap="wrap"
          >
            <Button
              className={pro.but}
              onClick={() => setcontador(Math.max(1, contador - 1))}
            >
              -
            </Button>
            <Typography variant="subtitle2">{contador}</Typography>
            <Button
              className={pro.but}
              onClick={() => setcontador(contador + 1)}
            >
              +
            </Button>
            <Button
              className={pro.especial}
              onClick={() => EliminarItemCarrito({ id: carro.idproducto })}
            >
              <DeleteIcon color="error" />
            </Button>
            <Grid2
              size={12}
              container
              m={1}
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <Typography variant="subtitle2">Talla</Typography>
              <FormControl variant="standard">
                {carro.categoria == "zapato" ? (
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={modelo}
                    onChange={handleModelo}
                    input={<BootstrapInput />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"35.5"}>35.5</MenuItem>
                    <MenuItem value={"36"}>36</MenuItem>
                    <MenuItem value={"37"}>37</MenuItem>
                    <MenuItem value={"37.5"}>37.5</MenuItem>
                    <MenuItem value={"38"}>38</MenuItem>
                    <MenuItem value={"38.5"}>38.5</MenuItem>
                    <MenuItem value={"39"}>39</MenuItem>
                  </Select>
                ) : (
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={modelo}
                    onChange={handleModelo}
                    input={<BootstrapInput />}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={"XS"}>XS</MenuItem>
                    <MenuItem value={"S"}>S</MenuItem>
                    <MenuItem value={"M"}>M</MenuItem>
                    <MenuItem value={"L"}>L</MenuItem>
                    <MenuItem value={"XL"}>XL</MenuItem>
                  </Select>
                )}
              </FormControl>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={3}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "600" }}
            component="div"
          >
            ${carro.precio}
          </Typography>
        </Grid2>
      </Grid2>
    </>
  );
}

export default CarritoItem;
