import storeApi from "@/api/storeApi";
import axios from "axios";
import useAuthStore from "./useAuthStore";
const {
  onCargando,
  onAddProducto,
  onvaciarProducto,
  onMenssage,
  onAddCarrito,
  onAddActivo,
  onClean,
  onBusqueda,
  onUpdateCarrito,
  onDeleteCarrito,
  onvaciarCarrito,
  onvaciarPedido,
  onAddPedido,
  ondeletePedido,
} = require("@/redux/productos/productoSlice");
const { useSelector, useDispatch } = require("react-redux");

const useProductoStore = () => {
  const {
    productoVisibles,
    paginas,
    carrito,
    menssage,
    productoActivo,
    busqueda,
    pedido,
  } = useSelector((state) => state.producto);

  const {id} = useAuthStore();
  const dispatch = useDispatch();

  const listarProducto = async ({ page }) => {
    dispatch(onCargando());
    try {
      const { data } = await storeApi.get(`store?page=${page}&limit=10`);

      if (data.data.length == 0) {
        dispatch(onvaciarProducto());
        dispatch(onMenssage("No ay Productos"));
      } else {
        dispatch(onvaciarProducto());
        dispatch(onAddProducto({ data: data.data, lastPage: data.lastPage }));
      }
    } catch (error) {
      dispatch(onvaciarProducto());
    }
  };

  const agregarCarrito = ({ dato }) => {
    dispatch(onCargando());

    const existe = carrito.some((car) => car.idproducto === dato.idproducto);

    if (existe) {
      dispatch(onMenssage("Ya se encuentra el producto en el carrito"));
      return false;
    } else {
      dispatch(onMenssage("Agregado"));
      dispatch(onAddCarrito([dato]));
      dispatch(onMenssage(""));
      return true;
    }
  };

  const productoActive = ({ dato }) => {
    dispatch(onCargando());
    dispatch(onAddActivo(dato));
  };

  const limpiarProductoActive = () => {
    dispatch(onCargando());
    dispatch(onClean());
  };

  const agregarBusqueda = ({ para }) => {
    dispatch(onBusqueda(para));
    limpiarProductoActive();
  };

  const listaProductoFiltro = async ({ q, page }) => {
    dispatch(onCargando());
    try {
      const { data } = await storeApi.get(
        `store/search?q=${q}&page=${page}&limit=10`
      );

      if (data.data.length == 0) {
        dispatch(onvaciarProducto());
        dispatch(onMenssage("No ay Productos"));
      } else {
        dispatch(onvaciarProducto());
        dispatch(onAddProducto({ data: data.data, lastPage: data.lastPage }));
      }
    } catch (error) {
      dispatch(onvaciarProducto());
      dispatch(onBusqueda(""));
    }
  };

  const ActualizarCarrito = ({ carro }) => {
    dispatch(onCargando());
    dispatch(onUpdateCarrito(carro));
  };

  const EliminarItemCarrito = ({ id }) => {
    dispatch(onCargando());
    dispatch(onDeleteCarrito(id));
  };

  const agregarPedido = async ({ usuario, total }) => {
    dispatch(onCargando());
    const dato = [];
    const fechaActual = new Date();
    fechaActual.setDate(fechaActual.getDate() + 3);
    carrito.map((item) => {
      dato.push({
        idproducto: item.idproducto,
        cantidad: item.cantidad,
        precio: item.precio,
        talla: item.talla,
      });
    });
    try {
      if (!usuario) {
        return false;
      }
      const { data } = await storeApi.post(`store/addPedido/${usuario}`, {
        fecha: new Date(),
        subtotal: total.subtotal,
        igv: total.igv,
        total: total.total,
        descuento: total.descuento,
        estado: "Pedido",
        fechaEntrega: fechaActual,
        productos: dato,
      });
      dispatch(onMenssage(data.message));
      return true;
    } catch (error) {
      dispatch(onMenssage("No se Agrego el pedido por token"));
      return false;
    }
  };

  const sinCarrito = () => {
    dispatch(onCargando());
    dispatch(onvaciarCarrito());
  };

  const listarPedido = async ({ usuario, page }) => {
    dispatch(onCargando());
    try {
      const { data } = await storeApi.get(
        `store/pedidos/${usuario}?page=${page}&limit=10`
      );

      if (data.data.length == 0) {
        dispatch(onvaciarPedido());
        dispatch(onMenssage("No ay Pedido"));
      } else {
        dispatch(onvaciarPedido());
        dispatch(onAddPedido({ data: data.data, lastPage: data.lastPage }));
      }
    } catch (error) {
      dispatch(onvaciarPedido());
    }
  };

  const generarPDF = async ({ pedido }) => {
    try {
      const response = await storeApi.post(
        `store/genPdf/${pedido}`,
        {},
        {
          responseType: "blob",
        }
      );

      // Verificar si es un PDF válido
      if (response.data.size === 0) {
        console.error("El PDF está vacío.");
        return false;
      }

      // Crear enlace de descarga
      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );

      // Crear elemento de enlace temporal
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `boleta_${pedido}.pdf`);

      // Simular clic para descargar
      document.body.appendChild(link);
      link.click();

      // Limpiar
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return false;
    }
  };

  const eliminarPedido = async({ids}) => {
    dispatch(onCargando());
    try {
      const { data } = await storeApi.delete(`store/pedidos/${ids}`);
      dispatch(ondeletePedido(ids));

      return true;
    } catch (error) {
      return false;
    }
  }

  return {
    //propiedades
    productoVisibles,
    paginas,
    pedido,
    menssage,
    productoActivo,
    busqueda,
    carrito,

    //metodos
    listarProducto,
    listarPedido,
    agregarCarrito,
    productoActive,
    limpiarProductoActive,
    agregarBusqueda,
    listaProductoFiltro,
    ActualizarCarrito,
    EliminarItemCarrito,
    agregarPedido,
    sinCarrito,
    generarPDF,
    eliminarPedido,
  }; 
};

export default useProductoStore;
