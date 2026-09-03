
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
const {getItem, removeItem, clear} = useLocalStorage()

const api = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// Ajouter automatiquement le token
api.interceptors.request.use((config) => {
  const token = getItem("token");

  console.log("token :", token);

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
    if (error.response?.status === 401) {
      console.log("Token expiré ou invalide");

      // Supprimer le token expiré
      removeItem("token");
      clear()

      // Récupérer la page actuelle
      const currentPath =
        window.location.pathname +
        window.location.search;

      // Rediriger vers la connexion
      window.location.href =
        `/?redirect=${encodeURIComponent(currentPath)}`;
    }

    return Promise.reject(error);
  }
);

export default api;