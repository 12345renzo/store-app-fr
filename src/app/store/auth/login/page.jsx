"use client";
import LoginComponent from "@/components/LoginComponent";
import { useRouter } from "next/navigation";
import useAuthStore from "../../../../hooks/useAuthStore";
import React, { useEffect } from "react";
import Swal from "sweetalert2";
import CargarComponet from "@/components/CargarComponet";

function page() {

  const ruta = useRouter();  
  const { starLogin, errorMessage, rol, isLoading } = useAuthStore();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!isLoading && rol) {
      ruta.replace(rol === "Admin" ? "/store/dashboard" : "/store/home");
    }
  }, [isLoading, rol]);

  if (isLoading || rol) return <CargarComponet />;
  

  const datos  = async (values, { setSubmitting }) => {
    try {
      const verifico = await starLogin({email:values.email,password:values.password});
      if(verifico){
        const ante = localStorage.getItem("ruta");
        if(ante){
          ruta.push(ante);
          await Swal.fire("Sistema", "Bienvenido", "success");
        }
        else{
          ruta.push("/store/home");
          await Swal.fire("Sistema", "Bienvenido", "success");
        }
      }
      else{
        await Swal.fire("Sistema", errorMessage, "error");
        console.log("error");
      }

    } catch (error) {
      Swal.fire('Sistema',errorMessage || "Usuario o contraseña incorrectos",'error');
    } finally {
      await setSubmitting(false); 
    }
  };

  return (
    <>
      <LoginComponent onSubmit={datos}/>
    </>
  );
}

export default page;
