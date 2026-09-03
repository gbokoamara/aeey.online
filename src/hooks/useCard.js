import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { useRedirect } from "./useNavigate";
import { userOnLocal } from "../helper/getUser";
import { API_CONFIG } from "../config/api";
import { logData } from "../utils/console";
import api from "../config/axios";

export const useCard = () => {
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);
  const { setItem } = useLocalStorage();
  const redirect = useRedirect();
  const user = userOnLocal();
  const userId = user?.id;

  const getAllCard = async () => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARD.GET_ALL}`;
      const response = await api.get(url);
      const allCards = response?.data?.allCards;
      setItem("allCards", allCards);
      setCards(allCards);
    } catch (error) {
      console.error("getAllCard error", error);
    } finally {
      setLoading(false);
    }
  };

  const getAllRequestCard = async () => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARD.GET_ALL_REQUEST}`;
      const response = await api.get(url);
      const allCards = response?.data?.allCards;
      setItem("allCards", allCards);
      setCards(allCards);
    } catch (error) {
      console.error("getAllRequestCard error", error);
    } finally {
      setLoading(false);
    }
  };

  const getRequestCard = async (userId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARD.GET_REQUEST}/${userId}`;
      const response = await api.get(url); // ✅ corrigé
      const card = response?.data?.card;
      // logData("card on hook", card)
      setItem("card", card);
      setCard(card);
    } catch (error) {
      console.error("getRequestCard error", error);
    } finally {
      setLoading(false);
    }
  };

  const requestCard = async (cardData) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARD.REQUEST_CARD}/${userId}`;
      const response = await api.post(url, { cardData });
      // logData("response", response)
      const requestedCard = response?.data?.card;
      setCard(requestedCard);
      return requestedCard
    } catch (error) {
      const message = error?.response?.data?.message || "Erreur inconnue";
      // console.error("requestCard error", error);
      // logData("error", message)
      setError(message)
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const updateCard = async (updateCardData, userId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARD.UPDATE_CARD}/${userId}`;
      const response = await api.put(url, { updateCardData });
      const card = response?.data?.card;
      setItem("card", card);
      setCard(card);
    } catch (error) {
      console.error("updateCard error", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (userId) => {
    setLoading(true);
    try {
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARD.DELETE}/${userId}`;
      const response = await api.delete(url);
      return response?.data?.message;
    } catch (error) {
      console.error("deleteCard error", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    card,
    error,
    cards,
    userId,
    loading,
    getAllCard,
    updateCard,
    deleteCard,
    requestCard,
    getRequestCard,
    getAllRequestCard,
  };
};