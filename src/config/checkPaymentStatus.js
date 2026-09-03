
import api from "./axios";

export const checkPaymentStatus = async (token) => {
  try {
    const response = await api.get(
      `https://pay.moneyfusion.net/paiementNotif/${token}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};