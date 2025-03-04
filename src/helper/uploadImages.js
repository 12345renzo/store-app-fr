import axios from "axios";

export const uploadImages = async (images) => {
  try {
    const validImages = images.filter((img) => img);

    if (validImages.length === 0) {
      console.log("No valid images to upload");
      return [];
    }

    const { data } = await axios.post("/api/sign-cloudinary");
    const { timestamp, signature, apiKey } = data;

    const uploadPromises = validImages.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString()); 
      formData.append("signature", signature);
      formData.append("upload_preset", "store-app");

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/dct8kss9p/image/upload`,
          formData
        );

        return res.data.secure_url; 
      } catch (uploadError) {
        console.error(
          "Error uploading individual image:",
          uploadError.response?.data || uploadError.message
        );
        return null;
      }
    });

    const results = await Promise.all(uploadPromises);
    return results.filter((url) => url !== null); 
  } catch (error) {
    console.error("Error al subir imágenes:", error.response?.data || error);
    throw error; 
  }
};
