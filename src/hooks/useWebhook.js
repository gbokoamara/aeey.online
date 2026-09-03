

import { API_CONFIG } from "../config/api";
import { logData } from "../utils/console";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import { useRedirect } from "./useNavigate";
import api from "../config/axios";

export const useWebhook = () => {
    const [ loading, setLoading ] = useState(false)
    const {setItem, removeItem} = useLocalStorage()


    const checkPayment = async (payment) => {
        logData("payment", payment)

        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WEBHOOK.CHECK}`
            logData("fetchUrl", url)
            const response = await api.post(url, {payment})
            const status = response?.status
            logData("response on checkPayment", response);
            // const user = response?.data?.user
            // logData("userData on checkPayment", user)
            // setItem("user", user)
            return status
        } catch (error) {
            console.error("checkPayment error", error)
        } finally {
            setLoading(false)
        }
        
    }


    return {checkPayment};
}

