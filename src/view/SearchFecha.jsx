"use client";
import { Grid2 } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import estilo from "../styles/auth.module.css";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";

function SearchFecha({ initialQuery }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialQuery || "");

  //const { agregarBusqueda } = useProductoStore();

  useEffect(() => {
    setSearchValue(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    console.log("ola");
  }, [searchValue]);

  const handleSearch = (date) => {
    const params = new URLSearchParams(searchParams.toString());

    if (date) {
      const formattedDate = dayjs(date).format("YYYY-MM-DD"); // Solo la fecha sin la hora
      params.set("q", formattedDate);
    } else {
      params.delete("q");
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <Grid2 size={12}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DateRangePicker"]}>
          <DatePicker
            localeText={{ start: "Check-in", end: "Check-out" }}
            sx={{
              border: "3px solid aqua",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                color: "white", 
                "& fieldset": { borderColor: "aqua" }, 
                "&:hover fieldset": { borderColor: "cyan" }, 
              },
              "& .MuiSvgIcon-root": {
                color: "white", 
              },
            }}
            slotProps={{
              textField: {
                InputProps: {
                  sx: { color: "white" }, 
                },
                InputLabelProps: {
                  sx: { color: "white" },
                },
              },
            }}
            onChange={(valor) => {
              setSearchValue(valor);
              handleSearch(valor);
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </Grid2>
  );
}

export default SearchFecha;
