import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const { publicId } = await req.json();
    if (!publicId)
      return Response.json(
        { error: "No se proporcionó publicId" },
        { status: 400 }
      );

    await cloudinary.v2.uploader.destroy(publicId);

    return Response.json({
      success: true,
      message: "Imagen eliminada correctamente",
    });
  } catch (error) {
    return Response.json(
      { error: "Error al eliminar imagen" },
      { status: 500 }
    );
  }
}
