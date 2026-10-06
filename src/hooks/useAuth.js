import { API_CONFIG } from "../config/api";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import { useRedirect } from "./useNavigate";
import api from "../config/axios";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setItem, clear } = useLocalStorage();
  const redirect = useRedirect();

  const login = async (data) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGING}`;
      const response = await api.post(url, { data });
      const user = response?.data?.user;
      const token = response?.data?.token;
      setItem("token", token);
      setItem("user", user);
      return user;
    } catch (error) {
      console.error("login error", error);
      throw error ;
    } finally {
      setLoading(false);
    }
  };

   const signIn = async (data) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`;
      const response = await api.post(url, { data });
      const user = response?.data?.user;
      const token = response?.data?.token;
      setItem("token", token);
      setItem("user", user);
      return user;
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const createPin = async (password, userId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.PASSWORD}/${userId}`;
      const response = await api.put(url, { password });
      const user = response?.data?.user;
      setItem("user", user);
      return user;
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyPin = async (password, userId) => {

    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.VERIFY_PASSWORD}/${userId}`;
      const response = await api.post(url, { password });
      const isMatch = response?.data?.isMatch;
      // setItem("user", user)
      return isMatch;
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const changePin = async (password, userId) => {

    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD}/${userId}`;
      const isMatch = await api.put(url, { password });
      // const isMatch = response?.data?.isMatch
      // setItem("user", user)
      return isMatch;
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const resetPin = async (token) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD}`;
      const response = await api.post(url, { token });
      return response;
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    // removeItem("user");
    clear();
    redirect("/");
  };

  return { loading, login, createPin, logout, verifyPin, changePin, resetPin, signIn };
};
