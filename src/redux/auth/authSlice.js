import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "not-authenticated",
    id: "",
    user: {},
    rol: "",
    errorMessage: null,
    isLoading: false,
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = null;
      state.isLoading = false;
    },

    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.id = payload.id;
      state.user = payload.usuario;
      state.rol = payload.rol;
      state.errorMessage = null;
      state.isLoading = false;
    },

    onLogout: (state,action) => {
      state.status = "not-authenticated";
      state.id = "";
      state.user = {};
      state.rol = "";
      state.errorMessage = null;
      state.isLoading = false;
    },

    onClearMessage: (state) => {
      state.errorMessage = null;
      state.isLoading = false;
    },

    onChangeUser: (state, action) => {
      state.user = {
        ...state.user,
        nombre: action.payload.datos.nombre,
        apellido: action.payload.datos.apellido,
        telefono: action.payload.datos.telefono,
        edad: action.payload.datos.edad,
        sexo: action.payload.datos.sexo,
        direccion: action.payload.datos.direccion,
      };
      state.isLoading = false;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading, onChecking, onLogin, onLogout, onClearMessage, onChangeUser } =
  authSlice.actions;
