import { createSlice } from "@reduxjs/toolkit";

export const productoSlice = createSlice({
  name: "producto",
  initialState: {
    productoVisibles: [],
    paginas: null,
    productoActivo: null,
    estado: "cargado",
    carrito: [],
    pedido: [],
    menssage: null,
    busqueda: "",
  },
  reducers: {
    //establecer estado
    onCargando: (state) => {
      state.estado = "cargando";
    },
    //limpiar estado activo
    onClean: (state) => {
      state.estado = "cargado";
      state.productoActivo = null;
    },
    //agregar producto activo
    onAddActivo: (state, action) => {
      state.estado = "cargado";
      state.productoActivo = action.payload;
    },
    //agregar producto al carrito
    onAddCarrito: (state, action) => {
      state.estado = "cargado";
      state.carrito = [...state.carrito, ...action.payload];
    },
    //agregar pedido
    onAddPedido: (state, action) => {
      state.estado = 'cargado';
      state.pedido = [...action.payload.data];
      state.paginas = action.payload.lastPage;
    },

    ondeletePedido: (state, action) => {
      const pedidos = state.pedido.filter(
        (item) => item.idpedido !== action.payload
      );
      state.pedido = [...pedidos];
      state.estado = "cargado";
    },
    //vaciar pedido
    onvaciarPedido:(state)=>{
      state.pedido=[];
      state.paginas = null;
      state.estado='cargado';
    },
    //actualizar carrito
    onUpdateCarrito: (state, action) => {
      state.carrito = state.carrito.map((item) => {
        if (item.idproducto === action.payload.idproducto) {
          return action.payload;
        }
        return item;
      });
      state.estado='cargado';
    },
    //eliminar producto del carrito
    onDeleteCarrito: (state,action) => {
      const nuevoCarrito = state.carrito.filter(
        (item) => item.idproducto !== action.payload
      );
      state.carrito = [...nuevoCarrito];
      state.estado = "cargado";
    },
    //vaciar producto del carrito
    onvaciarCarrito: (state) => {
      state.carrito = [];
      state.estado = "cargado";
    },
    //agregar producto
    onAddProducto: (state, action) => {
      state.estado = "cargado";
      state.productoVisibles = [...action.payload.data];
      state.paginas = action.payload.lastPage;
    },
    //eliminar producto
    onvaciarProducto: (state) => {
      state.productoVisibles = [];
      state.paginas = null;
      state.estado='cargado';
    },
    //agregar message
    onMenssage: (state, action) => {
      state.menssage = action.payload;
    },

    onLogoutCalendar: (state) => {
      state.productoActivo = null;
      state.estado = "cargado";
      state.carrito = [];
      state.pedido = [];
      state.menssage = null;
    },

    onBusqueda: (state, action)=>{
      state.busqueda = action.payload;
    }
  },
});

export const {
  onCargando,
  onClean,
  onAddActivo,
  onAddCarrito,
  onAddPedido,
  onUpdateCarrito,
  onDeleteCarrito,
  onAddProducto,
  onvaciarProducto,
  onvaciarCarrito,
  onMenssage,
  onLogoutCalendar,
  onBusqueda,
  onvaciarPedido,
  ondeletePedido,
} = productoSlice.actions;
