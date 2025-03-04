"use client";
import React from "react";
import RegisterComponent from "@/components/RegisterComponent";
import useAuthStore from "@/hooks/useAuthStore";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

function page() {

  const {startRegister,errorMessage} = useAuthStore();
  const ruta = useRouter();

  const datos = async (values, { setSubmitting }) => {
    const valor = {
      nombre: values.nombres,
      apellido: values.apellidos,
      telefono: values.telefono,
      email: values.email,
      password: values.password,
      rol: 3,
    }
    try {
      const cal = await startRegister(valor);
      if(cal){
        const ante = localStorage.getItem("ruta");
        if (ante) {
          ruta.push(ante);
          await Swal.fire('Sistema','Creado Exitosamente','success');
        } else {
          ruta.push("/store/home");
          await Swal.fire("Sistema", "Creado Exitosamente", "success");
        }
      }
      else{
        await Swal.fire('Sistema',errorMessage,'error');
      }
    } catch (error) {
      await Swal.fire(
        "Sistema",
        errorMessage || "Correo ya Usado",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return <RegisterComponent onSubmit={datos} />;
}

export default page;
