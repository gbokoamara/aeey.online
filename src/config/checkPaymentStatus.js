
import axios from "axios";

export const checkPaymentStatus = async (token) => {
  try {
    const response = await axios.get(
      `https://pay.moneyfusion.net/paiementNotif/${token}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};