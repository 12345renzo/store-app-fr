"use cliente"
import React, { useState } from "react";
import {
    IconButton,
    Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import useProductoStore from "@/hooks/useProductoStore";

function TablaComponent({
  data,
  headers,
  keyProp,
  onEdit,
  onDelete,
  page = 0,
  rowsPerPage = 5,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
  sx = { width: "100%", overflow: "hidden" },
}) {
  const handleChangePage = (event, newPage) => {
    onPageChange ? onPageChange(newPage) : setPage(newPage);
  };

  const {generarPDF} = useProductoStore();
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    onRowsPerPageChange
      ? onRowsPerPageChange(newRowsPerPage)
      : setRowsPerPage(newRowsPerPage);
  };

  // Estado interno si no se maneja desde el padre
  const [internalPage, setInternalPage] = useState(page);
  const [internalRowsPerPage, setInternalRowsPerPage] = useState(rowsPerPage);

  return (
    <Paper
      sx={{
        boxShadow: "0px 0px 45px rgba(255, 255, 255, 0.8)",
      }}
    >
      <TableContainer>
        <Table
          stickyHeader
          sx={{
            backgroundColor: "black",
            border: "5px solid aqua",
          }}
        >
          <TableHead>
            <TableRow>
              {headers.map((header) => (
                <TableCell sx={{ fontWeight: 600 }} key={header.key}>
                  {header.label}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 600 }} align="center">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item[keyProp]}>
                {headers.map((header) => (
                  <TableCell key={header.key} sx={{color: "white"}}>
                    {header.key === "foto1" ? (
                      <img
                        src={item[header.key]}
                        width={90}
                        height={100}
                        alt="No hay"
                      />
                    ) : (
                      item[header.key]
                    )}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(item)}>
                    <Delete />
                  </IconButton>
                  {item.idpedido != null ? (
                    <IconButton
                      color="success"
                      onClick={() => generarPDF({ pedido: item.idpedido })}
                    >
                      <Visibility />
                    </IconButton>
                  ) : (
                    ""
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              {headers.map((header) => (
                <TableCell key={header.key} sx={{ color: "white" }}>
                  {header.label}
                </TableCell>
              ))}
              <TableCell align="center" sx={{ color: "white" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <TablePagination
        sx={{
          borderRight: "5px solid aqua",
          borderBottom: "5px solid aqua",
          borderLeft: "5px solid aqua",
        }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalItems} // Usamos el total de elementos
        rowsPerPage={onRowsPerPageChange ? rowsPerPage : internalRowsPerPage}
        page={onPageChange ? page : internalPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
      />
    </Paper>
  );
}


export default TablaComponent;
