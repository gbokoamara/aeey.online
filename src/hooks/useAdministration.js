import { API_CONFIG } from "../config/api";
import { useState } from "react";
import api from "../config/axios";
import { toastError, toastSuccess } from "../helper/toasterHelper";
import { logData } from "../utils/console";

export const useAdministration = () => {
  const [loading, setLoading] = useState(false);
  const [moderator, setModerator] = useState(null);
  const [moderators, setModerators] = useState(null);
  const [management, setManagement] = useState(null);
  const [stats, setStats] = useState(null);


  const addModerator = async (addData) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.ADD_MODERATOR}`;
      const response = await api.post(url, {addData });
      const moderator = response?.data?.moderator;
      const message = response?.data?.message;
      console.log("response", response)
      setModerator(moderator)
      if (moderator) {
        toastSuccess(message)
        getModerators()
      }
    } catch (error) {
      console.error("login error", error);
      const message = error.response.data.message;
      // toastError(message)
    } finally {
      setLoading(false);
    }
  };

  const getModerator = async () => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.GET_MODERATOR}`;
      const response = await api.get(url);
      const moderator = response?.data?.moderator;
      const message = response?.data?.message;
      setModerator(moderator)
      // toastSuccess(message)
    } catch (error) {
      console.error("login error", error);
      const message = error?.response?.data?.message;
      toastError(message)
    } finally {
      setLoading(false);
    }
  };

  const getModerators = async () => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.GET_MODERATORS}`;
      const response = await api.get(url);
      const moderators = response?.data?.moderators;
      const message = response?.data?.message;
      setModerators(moderators)
      // toastSuccess(message)
    } catch (error) {
      console.error("login error", error);
      const message = error?.response?.data?.message;
      toastError(message)
    } finally {
      setLoading(false);
    }
  };

  const removeModerator = async (id) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.REMOVE_MODERATOR}`;
      const response = await api.put(url, {id});
      const moderator = response?.data?.moderator;
      const message = response?.data?.message;
      setModerator(moderator)
      toastSuccess(message)
      getModerators()
    } catch (error) {
      console.error("login error", error);
      const message = error.response.data.message;
      toastError(message)
    } finally {
      setLoading(false);
    }
  };

  const getManagement  = async () => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.MANAGE}`;
      const response = await api.get(url);
      const tresaury = response?.data?.tresaury;
      // logData("tresaury",tresaury);
       setManagement(tresaury)
      // toastSuccess(message)
    } catch (error) {
      console.error("login error", error);
      const message = error?.response?.data?.message;
      toastError(message)
    } finally {
      setLoading(false);
    }
  };
  const addManagement = async (addData) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADMIN.MANAGE}`;
      const response = await api.post(url, {addData });
      const stats = response?.data?.stats;
      const message = response?.data?.message;
      setManagement(stats)
      toastSuccess(message)
      getManagement()
    } catch (error) {
      console.error("login error", error);
      const message = error.response.data.message;
      toastError(message)
    } finally {
      setLoading(false);
    }
  };

  return {management, moderator, moderators, loading, addModerator, getModerator, getModerators, removeModerator, addManagement, getManagement };
}; // management getManagement loading
