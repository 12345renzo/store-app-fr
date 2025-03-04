"use client"
import { Grid2, TextField } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import estilo from "../styles/auth.module.css";

function SearchProduc({ initialQuery }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(initialQuery || "");

  //const { agregarBusqueda } = useProductoStore();

  useEffect(() => {
    setSearchValue(searchParams.get("q") || "");
  }, [searchParams]);

  useEffect(() => {
    //agregarBusqueda({ para: searchValue });
    console.log("ola");
    
  }, [searchValue]);

  const handleSearch = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    value.trim() ? params.set("q", value) : params.delete("q");
    router.replace(`?${params.toString()}`);
  };

  return (
    <Grid2 size={12}>
      <TextField
        fullWidth
        id="standard-buscar"
        variant="standard"
        placeholder="Buscar..."
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleSearch(e.target.value);
        }}
        InputProps={{ className: estilo.inputField }}
        sx={{
          "& .MuiInput-root": {
            border: "5px solid aqua",
            borderRadius: "10px",
            padding: "8px 20px",
            transition: "0.3s all ease",
            "&.Mui-focused": { backgroundColor: "white" },
          },
          "& .MuiInput-input": {
            "&:focus": { color: "black" },
          },
        }}
      />
    </Grid2>
  );
}

export default SearchProduc