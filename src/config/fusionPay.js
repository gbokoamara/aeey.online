import axios from "axios";

const apiUrl = import.meta.env.VITE_FUSION_PAY ; 


export const makePayment = async (paymentData) => {
  console.log("paymentData dans makePayment =>", paymentData)
  try {
    const response = await axios.post(apiUrl, paymentData, {
      headers : {
        "Content-Type" : "application/json",
      },
    }) ;
    console.log("response dans makePayment =>", response)
    return response.data ;
  } catch (error) {
    console.error("Erreur de paiement:", error.response?.data || error.message);
    console.error("Erreur de paiement:", error);
    throw error;
  }
};