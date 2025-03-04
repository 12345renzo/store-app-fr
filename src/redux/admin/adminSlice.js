import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    estado: "cargado",
    producto: [],
    usuario: [],
    pedido: [],
    categoria: [],
    count: null,
    countC: null,
    countU: null,
    countP: null,
  },
  reducers: {
    onEstado: (state) => {
      state.estado = "cargando";
    },
    onListaProductoA: (state, action) => {
      state.estado = "cargado";
      state.producto = [...action.payload.data];
      state.count = action.payload.pagina;
    },
    onListarCategoriaA: (state, action) => {
      state.estado = "cargado";
      state.categoria = [...action.payload.data];
      state.countC = action.payload.count;
    },
    onListarUsuarios: (state, action) => {
      state.estado = "cargado";
      state.usuario = [...action.payload.data];
      state.countU = action.payload.count;
    },
    onListarPedidos: (state, action) => {
      state.estado = "cargado";
      state.pedido = [...action.payload.data];
      state.countP = action.payload.count;
    },
    onLogoutAdmin: (state) => {
      state.producto = [];
      state.usuario = [];
      state.pedido = [];
      state.categoria = [];
      state.count = null;
      state.countC = null;
      state.countU = null;
      state.countP = null;
    },
  },
});

export const {
  onEstado,
  onListarPedidos,
  onListaProductoA,
  onListarCategoriaA,
  onListarUsuarios,
  onLogoutAdmin
} = adminSlice.actions;
