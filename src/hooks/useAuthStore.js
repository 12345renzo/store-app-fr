"use client";
import storeApi from "@/api/storeApi";
import { onLogoutAdmin } from "@/redux/admin/adminSlice";
import { onLogoutCalendar } from "@/redux/productos/productoSlice";
import axios from "axios";
import Cookies  from "js-cookie";

const {
  setLoading,
  onChecking,
  onLogin,
  onLogout,
  onClearMessage,
  onChangeUser,
} = require("@/redux/auth/authSlice");
const { useSelector, useDispatch } = require("react-redux");

const useAuthStore = () => {
  const { status, id, user, rol, errorMessage, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  //para logearnos
  const starLogin = async ({ email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await storeApi.post("auth/login", {
        email,
        password,
      });

      if (data.message != null) {
        dispatch(onLogout({ errorMessage: data.message }));
        setTimeout(() => {
          dispatch(onClearMessage());
        }, 1500);
        return false;
      } else {
        localStorage.setItem("token", data.token);
        Cookies.set("auth_token", data.token, { expires: 7, secure: true });
        Cookies.set("user_rol", data.rol, { expires: 7, secure: true });
        dispatch(
          onLogin({
            id: data.id,
            rol: data.rol,
            usuario: data.usuario,
          })
        );
        return true;
      }
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(onClearMessage());
      }, 1500);
      return true;
    }
  };

  //para registrarnos
  const startRegister = async (valor) => {
    dispatch(onChecking());
    try {
      const {data} = await storeApi.post(`auth/register`,{
        nombre: valor.nombre,
        apellido: valor.apellido,
        telefono: valor.telefono,
        email: valor.email,
        password: valor.password,
        rol: valor.rol
      });
      if (data.message != null) {
        dispatch(onLogout({ errorMessage: data.message }));
        setTimeout(() => {
          dispatch(onClearMessage());
        }, 1500);
        return false;
      } else {
        localStorage.setItem("token", data.token);
        Cookies.set("auth_token", data.token, { expires: 7, secure: true });
        Cookies.set("user_rol", data.rol, { expires: 7, secure: true });
        dispatch(
          onLogin({
            id: data.id,
            rol: data.rol,
            usuario: data.usuario,
          })
        );
        return true;
      }
    } catch (error) {
      dispatch(onLogout("Credenciales incorrectas"));
      setTimeout(() => {
        dispatch(onClearMessage());
      }, 1500);
      return true;
    }
  };

  //para cambiar pass
  const startNewPass = async ({ email, password }) => {
    try {
        const { data } = await storeApi.post("auth/resetPass", {
          email,
          password,
        });
        if (data.message != null) {
          dispatch(onLogout({ errorMessage: data.message }));
          setTimeout(() => {
            dispatch(onClearMessage());
          }, 1500);
          return false;
        } else {
          return true;
        }
    } catch (error) {
      return false;
    }
  };

  //para salir
  const startLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("ruta");
    Cookies.remove("auth_token");
    Cookies.remove("user_rol");
    dispatch(onLogoutCalendar());
    dispatch(onLogoutAdmin());
    dispatch(onLogout());
  };

  //validar token
  const checkToken = async () => {
    dispatch(setLoading(true));
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(setLoading(false));
      return dispatch(onLogout());
    }
    try {
      const { data } = await storeApi.get(`auth/revalidar`);
      localStorage.setItem("token", data.token);
      Cookies.set("auth_token", data.token, { expires: 7, secure: true });
      Cookies.set("user_rol", data.rol, { expires: 7, secure: true });
      dispatch(
        onLogin({
          id: data.id,
          rol: data.rol,
          usuario: data.usuario,
        })
      );
    } catch (error) {
      startLogout();
    } finally{
      dispatch(setLoading(false));
    }
  };

  const editUser = async ({ datos }) => {
    try {
      const { data } = await storeApi.post("auth/editar",
        {
          id: datos.id,
          nombre: datos.nombre,
          apellido: datos.apellido,
          telefono: datos.telefono,
          sexo: datos.sexo,
          edad: datos.edad,
          direccion: datos.direccion,
        }
      );
      dispatch(onChangeUser({datos}));
      return true;
    } catch (error) {
      return false;
    }
  };
  

  return {
    //propiedades
    id,
    status,
    user,
    rol,
    errorMessage,
    isLoading,

    //atributos
    starLogin,
    startRegister,
    startNewPass,
    startLogout,
    checkToken,
    editUser,
  };
};

export default useAuthStore;
