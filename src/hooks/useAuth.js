import { API_CONFIG } from "../config/api";
import { logData } from "../utils/console";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import { useRedirect } from "./useNavigate";
import api from "../config/axios";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { setItem, removeItem, clear } = useLocalStorage();
  const redirect = useRedirect();

  const login = async (data) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`;
      logData("fetchUrl", url);
      const response = await api.post(url, { data });
      logData("response on login", response);
      const user = response?.data?.user;
      const token = response?.data?.token;
      setItem("token", token);
      logData("token", token);
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
      logData("passUrl", url);
      const response = await api.put(url, { password });
      logData("response on pass", response);
      const user = response?.data?.user;
      logData("userData on pass", user);
      setItem("user", user);
      return user;
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const verifyPin = async (password, userId) => {
    logData("password", password);
    logData("userId", userId);

    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.VERIFY_PASSWORD}/${userId}`;
      logData("passUrl", url);
      const response = await api.post(url, { password });
      logData("response on pass", response);
      const isMatch = response?.data?.isMatch;
      logData("userData on pass", isMatch);
      // setItem("user", user)
      return isMatch;
    } catch (error) {
      console.error("login error", error);
    } finally {
      setLoading(false);
    }
  };

  const changePin = async (password, userId) => {
    logData("password", password);
    logData("userId", userId);

    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD}/${userId}`;
      logData("passUrl", url);
      const isMatch = await api.put(url, { password });
      logData("response on pass", isMatch);
      // const isMatch = response?.data?.isMatch
      // logData("userData on pass", isMatch)
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

  return { loading, login, createPin, logout, verifyPin, changePin, resetPin };
};
