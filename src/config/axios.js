
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { toastError } from "../helper/toasterHelper";
const {getItem, removeItem, clear} = useLocalStorage()

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter automatiquement le token
api.interceptors.request.use((config) => {
  const token = getItem("token");

  // console.log("token :", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Gérer le token expiré
api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message ;
    
    if (status === 401 ) {
      toastError(message)
      // Supprimer le token expiré
      removeItem("token");
      clear()

      // Récupérer la page actuelle
      const currentPath =
        window.location.pathname +
        window.location.search;

      // Rediriger vers la connexion
      window.location.href =`/?redirect=${encodeURIComponent(currentPath)}`;
    }
    
    if (status === 404) {
      toastError(message || "Route non définie");
      return Promise.reject(error);
    }

    if (status === 400) {
      console.log(message)
      toastError(message || "Requête incorrecte");
      return Promise.reject(error);
    }
    if (status === 404) {
      console.log(message)
      toastError(message || "Requête incorrecte");
      return Promise.reject(error);
    }
    if (status === 403) {
      console.log(message)
      toastError(message || "Requête incorrecte");
      return Promise.reject(error);
    }
    if (status === 402) {
      console.log(message)
      toastError(message || "Requête incorrecte");
      return Promise.reject(error);
    }

    toastError(message || "Une erreur est survenue");


    return Promise.reject(error);
  }
);

export default api;

