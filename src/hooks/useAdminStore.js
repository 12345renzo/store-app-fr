import { deleteImages } from "@/helper/cloudinary";
import { uploadImages } from "@/helper/uploadImages";
import axios from "axios";

const { default: storeApi } = require("@/api/storeApi");
const {
  onEstado,
  onListaProductoA,
  onListarCategoriaA,
  onListarUsuarios,
  onListarPedidos,
} = require("@/redux/admin/adminSlice");
const { useSelector, useDispatch } = require("react-redux");

const useAdminStore = () => {
  const { producto, usuario, pedido, categoria, count, countC, countU, countP } =
    useSelector((state) => state.admin);
  const dispath = useDispatch();

  const cargarTablaProducto = async ({ bus, page, limit }) => {
    dispath(onEstado());
    try {
      const { data } = await storeApi.get(
        `store/search?q=${bus}&page=${page}&limit=${limit}`
      );
      dispath(onListaProductoA({ data: data.data, pagina: data.count }));
    } catch (error) {
      throw new Error("Error");
    }
  };

  const cargarTablaCategoria = async ({ bus, page, limit }) => {
    dispath(onEstado());
    try {
      const { data } = await storeApi.get(
        `store/cate/lista?q=${bus}&page=${page}&limit=${limit}`
      );
      dispath(onListarCategoriaA({ data: data.data, count: data.total }));
    } catch (error) {
      throw new Error("Error");
    }
  };

  const categoriaId = (nombre) => {
    const objetoEncontrado = categoria.find(
      (objeto) => objeto.nombre === nombre
    );

    return objetoEncontrado.idcategoria;
  };

  const agregarProducto = async (datos) => {
    try {
      const imagenes = [
        datos.foto1,
        datos.foto2,
        datos.foto3,
        datos.foto4,
        datos.foto5,
      ].filter((img) => img);

      const imagenesURL = await uploadImages(imagenes);
      const completo = {
        ...datos,
        foto1: imagenesURL[0] || "",
        foto2: imagenesURL[1] || "",
        foto3: imagenesURL[2] || "",
        foto4: imagenesURL[3] || "",
        foto5: imagenesURL[4] || "",
      };

      const { data } = await storeApi.post("store/addProduct", {
        nombre: completo.nombre,
        descripcion: completo.descripcion,
        stock: completo.stock,
        precio: completo.precio,
        descuento: completo.descuento,
        foto1: completo.foto1,
        foto2: completo.foto2,
        foto3: completo.foto3,
        foto4: completo.foto4,
        foto5: completo.foto5,
        sexo: completo.sexo,
        categoria: completo.categoria,
      });

      cargarTablaProducto({ bus: "", page: 1, limit: 10 });

      return true;
    } catch (error) {
      throw new Error(
        "Error al agregar producto: " + (error.message || "Desconocido")
      );
      return false;
    }
  };

  const editarProdcto = async (datos) => {
    dispath(onEstado());
    try {
      const { data } = await storeApi.put(
        `store/updateProdut/${datos.idproducto}`,
        {
          nombre: datos.nombre,
          descripcion: datos.descripcion,
          stock: datos.stock,
          precio: datos.precio,
          descuento: datos.descuento,
          foto1: datos.foto1,
          foto2: datos.foto2,
          foto3: datos.foto3,
          foto4: datos.foto4,
          foto5: datos.foto5,
          sexo: datos.sexo,
          categoria: datos.categoria,
        }
      );
      cargarTablaProducto({ bus: "", page: 1, limit: 10 });

      return true;
    } catch (error) {
      throw new Error(
        "Error al agregar producto: " + (error.message || "Desconocido")
      );
      return false;
    }
  };

  const eliminarProducto = async (datos) => {
    const id = datos.idproducto;
    const urls = [
      datos.foto1,
      datos.foto2,
      datos.foto3,
      datos.foto4,
      datos.foto5,
    ];

    try {
      await deleteImages(urls);

      const { data } = await storeApi.delete(`store/deleteProdut/${id}`);
      cargarTablaProducto({ bus: "", page: 1, limit: 10 });
      return true;
    } catch (error) {
      return false;
    }
  };

  const agregarCategoria = async (nombre) => {
    dispath(onEstado());
    try {
      const { data } = await storeApi.post("store/cate/add", {
        nombre: nombre,
      });
      cargarTablaCategoria({ bus: "", page: 1, limit: 10 });
      return true;
    } catch (error) {
      return false;
    }
  };

  const editarCategoria = async (datos) => {
    dispath(onEstado());
    try {
      const { data } = await storeApi.put(
        `store/cate/update/${datos.idcategoria}`,
        {
          nombre: datos.nombre,
        }
      );
      cargarTablaCategoria({ bus: "", page: 1, limit: 10 });
      return true;
    } catch (error) {
      return false;
    }
  };

  const eliminarCategoria = async (id) => {
    dispath(onEstado());
    try {
      const { data } = await storeApi.delete(`store/cate/delete/${id}`);
      cargarTablaCategoria({ bus: "", page: 1, limit: 10 });
      return true;
    } catch (error) {
      return false;
    }
  };

  const cargarTablaUsuarios = async ({ bus, page, limit }) => {
    dispath(onEstado());
    try {
      const { data } = await storeApi.get(
        `auth/user?q=${bus}&page=${page}&limit=${limit}`
      );
      dispath(onListarUsuarios({ data: data.data, count: data.count }));
    } catch (error) {
      throw new Error("Error");
    }
  };

  const agregarUsuario = async (datos) => {
    dispath(onEstado());
    try {
      
      const { data } = await storeApi.post("auth/user/add", {
        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.telefono,
        email: datos.email,
        password: datos.password,
        edad: datos.edad,
        sexo: datos.sexo,
        direccion: datos.direccion,
        rol: datos.rol,
      });

      if (data.message != null) {
        console.log(data.message);
        return false;
      } else {
        cargarTablaUsuarios({ bus: "", page: 1, limit: 10 });
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const eliminarUsuario = async (id) => {
    dispath(onEstado());
    try {
      const { data } = await storeApi.delete(`auth/user/eliminar/${id}`);
      cargarTablaUsuarios({ bus: "", page: 1, limit: 10 });
      return true;
    } catch (error) {
      return false;
    }
  };

  const cargarTablaPedido = async ({ bus, page, limit }) => {
    dispath(onEstado());
    try {
      const { data } = await storeApi.get(
        `store/pedidos?q=${bus}&page=${page}&limit=${limit}`
      );
      dispath(onListarPedidos({ data: data.data, count: data.count }));
    } catch (error) {
      throw new Error("Error");
    }
  };

  const editPedido = async({datos}) => {
    dispath(onEstado());
    try {
      const { data } = await storeApi.put(`store/pedidos/${datos.idpedido}`, {
        descuento: datos.descuento,
        estado: datos.estado,
        fecha: datos.fecha,
        fechaEntrega: datos.fechaEntrega,
        igv: datos.igv,
        subtotal: datos.subtotal,
        total: datos.total,
        usuario: datos.usuario,
      });

      cargarTablaPedido({bus:"", page:1,limit:10});

      return true;
    } catch (error) {
      throw new Error("Error");
      return false;
    }
  }

  return {
    //atributos
    producto,
    usuario,
    pedido,
    categoria,
    count,
    countC,
    countP,
    countU,

    //metodos
    cargarTablaProducto,
    cargarTablaCategoria,
    cargarTablaPedido,
    agregarProducto,
    categoriaId,
    editarProdcto,
    eliminarProducto,
    agregarCategoria,
    editarCategoria,
    eliminarCategoria,
    cargarTablaUsuarios,
    agregarUsuario,
    eliminarUsuario,
    editPedido,
  };
};

export default useAdminStore;
