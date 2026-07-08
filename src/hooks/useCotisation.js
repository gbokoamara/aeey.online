import { API_CONFIG } from "../config/api";
import axios from "axios";
import { logData } from "../utils/console";
import { useLocalStorage } from "./useLocalStorage";
import { useEffect, useState } from "react";
import { useRedirect } from "./useNavigate";
import { EventsOnLocal } from "../helper/getUser";

export const useCotisation = () => {
  const [loading, setLoading] = useState(false);
  const { setItem, removeItem } = useLocalStorage();
  const redirect = useRedirect();
  const [cotisations, setCotisations] = useState([]);
  const [cotisation, setCotisation] = useState(null);
  // const expenses = ExpensesOnLocal();
  // const userId = user.id;

  const addCotisation = async (addData) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COTISATION.ADD}`;
      logData("fetchUrl", url);
      const response = await axios.post(url, { addData });
      logData("response on add expense", response);
      const cotisation = response?.data?.cotisation;
      logData("cotisation on add", cotisation);
      setItem("cotisation", cotisation);
      return cotisation;
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const updateCotisation = async (cotisationId, updateData) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COTISATION.UPDATE}/${cotisationId}`;
      logData("fetchUrl", url);
      const response = await axios.put(url, { updateData });
      logData("response on update cotisation", response);
      const cotisations = response?.data?.cotisations;
      logData("cotisations on cotisations", cotisations);
      setItem("cotisations", cotisations);
      setCotisation(cotisations);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const getCotisations = async () => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COTISATION.GET_ALL}`;
      logData("fetchUrl", url);
      const response = await axios.get(url);
      logData("response on add cotisation", response);
      const cotisations = response?.data?.cautisations
      logData("cotisations on fetch", cotisations);
      setItem("cotisations", cotisations);
      setCotisations(cotisations);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const getCotisation = async (cotisationId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COTISATION.GET_ONE}/${cotisationId}`;
      logData("fetchUrl", url);
      const response = await axios.get(url);
      logData("response on add cotisation", response);
      const cotisation = response?.data?.cotisation;
      logData("cotisation on fetch", cotisation);
      setItem("cotisation", cotisation);
      setCotisation(cotisation);
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCotisation = async (cotisationId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COTISATION.DELETE_ONE}/${cotisationId}`;
      logData("fetchUrl", url);
      const response = await axios.delete(url);
      logData("response on delete cotisation", response);
      const message = response?.data?.message;
      logData("message on fetch", message);
      // setItem("cotisation", cotisation)
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    cotisation,
    cotisations,
    addCotisation,
    updateCotisation,
    getCotisations,
    getCotisation,
    deleteCotisation,
  };
};
