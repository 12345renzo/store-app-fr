// pages/api/sign-cloudinary.js or app/api/sign-cloudinary/route.js
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export async function POST() {
  try {
    // Verificar que las variables de entorno estén configuradas
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Faltan variables de entorno de Cloudinary");
      return NextResponse.json(
        { error: "Configuración de Cloudinary incompleta" },
        { status: 500 }
      );
    }

    // Configuración de Cloudinary
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const timestamp = Math.round(new Date().getTime() / 1000);

    // Incluir el upload_preset en la firma para mejorar la seguridad
    const params = {
      timestamp: timestamp,
      upload_preset: "store-app", // Debe coincidir con el upload_preset en el cliente
    };

    const signature = cloudinary.utils.api_sign_request(
      params,
      process.env.CLOUDINARY_API_SECRET
    );

    return NextResponse.json({
      timestamp,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME, // Enviar también el cloud_name
    });
  } catch (error) {
    console.error("Error en sign-cloudinary:", error);
    return NextResponse.json(
      { error: "Error al generar la firma de Cloudinary" },
      { status: 500 }
    );
  }
}
