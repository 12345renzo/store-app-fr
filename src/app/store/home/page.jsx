"use client";
import CarruselComponent from "@/components/CarruselComponent";
import useAuthStore from "@/hooks/useAuthStore";
import useProductoStore from "@/hooks/useProductoStore";
import PrincipalView from "@/view/PrincipalView";
import React, { useEffect } from "react";

function page() {

  const {agregarBusqueda} = useProductoStore();
  const {checkToken} = useAuthStore();
  useEffect(() => {
    agregarBusqueda({para: ""});
    checkToken();
  }, []);
  
  return (
    <div style={{ paddingBottom: "0.1%" }}>
      {/*carrusel de modelos */}
      <CarruselComponent />
      {/*aki esta el titulo el filtro los card y la paginacion */}
      <PrincipalView/>
    </div>
  );
}

export default page;
