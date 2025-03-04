import axios from "axios";

export const getPublicIdFromUrl = (imageUrl) => {
  const parts = imageUrl.split("/upload/");
  if (parts.length < 2) return null; // Si no es una URL válida, retorna null

  return parts[1].split(".")[0]; // Extrae el `public_id` sin la extensión
};

export const deleteImages = async (imageUrls) => {
  try {
    const deletePromises = imageUrls.map(async (url) => {
      const publicId = getPublicIdFromUrl(url);
      if (!publicId) return null;

      return await axios.post("/api/delete-cloudinary", { publicId });
    });

    await Promise.all(deletePromises);
    //console.log("Todas las imágenes fueron eliminadas.");
  } catch (error) {
    console.error("Error al eliminar imágenes:", error);
  }
};
