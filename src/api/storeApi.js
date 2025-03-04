import axios from "axios";
//import getEnvVaribles from "../helper/getEnvVaribles";

//const { VITE_API_URL } = getEnvVaribles();

const storeApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});


//configurar interceptor para verificar
//el token en request

storeApi.interceptors.request.use(
   config => {
    config.headers={
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config;
   } 
)

export default storeApi;