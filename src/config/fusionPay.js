import axios from "axios";

const apiUrl = import.meta.env.VITE_FUSION_PAY ; 


export const makePayment = async (fusionPayload) => {
  console.log("fusionPayload dans makePayment =>", fusionPayload)
  try {
    const response = await axios.post(apiUrl, fusionPayload, {
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