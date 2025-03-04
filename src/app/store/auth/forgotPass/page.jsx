"use client";
import ForgotComponent from "@/components/ForgotComponent";
import useAuthStore from "@/hooks/useAuthStore";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

function page() {
  const ruta = useRouter();
  const {startNewPass,errorMessage} = useAuthStore();

  const datos = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      const inf = await startNewPass({email: values.email, password: values.password});
      if(inf){
        await Swal.fire('Sistema','Clave cambiada','success');
        ruta.push("/store/auth/login");
      }
      else{
        await Swal.fire('Sistema','No existe ese Email','error');
      }
    } catch (error) {
      await Swal.fire("Sistema", errorMessage || "No existe ese Email", "error");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <ForgotComponent onSubmit={datos} />
    </>
  );
}

export default page;
