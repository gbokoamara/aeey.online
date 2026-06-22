
import { API_CONFIG } from "../config/api";
import axios from "axios"
import { logData } from "../utils/console";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import { useRedirect } from "./useNavigate";
import { userOnLocal } from "../helper/getUser";

export const usePayment = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ payment, setPayment ] = useState(null);
    const [ payments, setPayments ] = useState([]);
    const {setItem, removeItem} = useLocalStorage();
    const redirect = useRedirect();
    const user = userOnLocal();
    const userId = user.id;
    

    const addPayment = async (addData) => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENT.ADD}/${userId}`
            logData("fetchUrl", url)
            const response = await axios.post(url, {addData})
            logData("response on add", response)
            const payment = response?.data?.payment
            logData("paymentData on login", payment)
            setItem("payment", payment)
            setPayment(payment)
        } catch (error) {
            console.error("login error", error)
            setError(error)
        } finally {
            setLoading(false)
        }
        
    }

    const getPayment = async (paymentId) => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENT.GET}/${paymentId}`
            logData("passUrl", url)
            const response = await axios.get(url)
            logData("response on pass", response)
            const payment = response?.data?.payment
            logData("paymentData on pass", payment)
            setItem("payment", payment)
            setPayment(payment)
        } catch (error) {
            setError(error)
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
    };

    const getAllPayments = async () => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENT.GET_ALL}`
            logData("passUrl", url)
            const response = await axios.get(url)
            logData("response on pass", response)
            const payments = response?.data?.payments
            logData("paymentsData on pass", payments)
            setItem("payments", payments)
            setPayments(payments)
        } catch (error) {
            setError(error)
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
    };

    

    return {
        error,
        loading,
        payment,
        payments,
        addPayment,
        getPayment, 
        getAllPayments,
        };
}

