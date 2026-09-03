
import { API_CONFIG } from "../config/api";
import { logData } from "../utils/console";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import { useRedirect } from "./useNavigate";
import { userOnLocal } from "../helper/getUser";
import api from "../config/axios";

export const usePayment = () => {
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ payment, setPayment ] = useState(null);
    const [ payments, setPayments ] = useState([]);
    const [ userPayments, setUserPayments ] = useState([]);
    const [ stats, setStats ] = useState(null);
    const {setItem, removeItem} = useLocalStorage();
    
    const redirect = useRedirect();
    const user = userOnLocal();
    const userId = user.id;
    

    const addPayment = async (addData) => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENT.ADD}/${userId}`
            // logData("fetchUrl", url)
            const response = await api.post(url, {addData})
            // logData("response on add", response)
            const payment = response?.data?.payment
            // logData("paymentData on login", payment)
            setItem("payment", payment)
            setPayment(payment)
            return payment
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
            // logData("passUrl", url)
            const response = await api.get(url)
            // logData("response on pass", response)
            const payment = response?.data?.payment
            // logData("paymentData on pass", payment)
            setItem("payment", payment)
            setPayment(payment)
        } catch (error) {
            setError(error)
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
    };

    const getUserPayments = async () => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENT.GET_BY_USERID}/${userId}`
            logData("passUrl", url)
            const response = await api.get(url)
            logData("response on pass", response)
            const payments = response?.data?.payments
            logData("paymentsData on pass", payments)
            setItem("payments", payments)
            setUserPayments(payments)
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
            // logData("passUrl", url)
            const response = await api.get(url)
            // logData("response on pass", response)
            const payments = response?.data?.payments
            // logData("paymentsData on pass", payments)
            setItem("payments", payments)
            setPayments(payments)
        } catch (error) {
            setError(error)
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
    };

    const getPaymentStat = async () => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PAYMENT.STAT}`
            // logData("passUrl", url)
            const response = await api.get(url)
            // logData("response on pass", response)
            const stats = response?.data?.stats
            // logData("statsData on hooks", stats)
            setItem("stats", stats)
            setStats(stats)
        } catch (error) {
            setError(error)
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
    };

    return {
        stats,
        error,
        loading,
        payment,
        payments,
        userPayments,
        addPayment,
        getPayment, 
        getAllPayments,
        getPaymentStat,
        getUserPayments,
        };
}

