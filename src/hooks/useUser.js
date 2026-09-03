
import { API_CONFIG } from "../config/api";
import { logData } from "../utils/console";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import { useRedirect } from "./useNavigate";
import { userOnLocal } from "../helper/getUser";
import api from "../config/axios";

export const useUser = () => {
    const [ loading, setLoading ] = useState(false);
    const [ user, setUser ] = useState(null);
    const {setItem, removeItem} = useLocalStorage();
    const redirect = useRedirect();
    const users = userOnLocal();
    const userId = users?.id;
    
    const getUser = async () => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.GET_USER}/${userId}`
            // logData("passUrl", url)
            const response = await api.get(url,)
            // logData("response on get-card", response)
            const user = response?.data?.user
            logData("userData on pass", user)
            setItem("user", user)
            setUser(user)
        } catch (error) {
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
        
    };

    const update = async (updateDate) => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.UPDATE}/${userId}`
            // logData("fetchUrl", url)
            const response = await api.post(url, {updateDate})
            // logData("response on update", response)
            const user = response?.data?.user
            logData("userData on login", user)
            setItem("user", user)
            // return user
        } catch (error) {
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
        
    }

    const memberRequest = async (cardData) => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.MEMBER_REQUEST}/${userId}`
            // logData("passUrl", url)
            const response = await api.post(url, {cardData})
            // logData("response on member-request", response)
            const member = response?.data?.member
            // logData("cardData on request", member)
            setItem("member", member)
            return response?.data
        } catch (error) {
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
        
    };

    const cardRequest = async (cardData) => {
            // logData("password", password)
            // logData("userId", userId)

        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.CARD_REQUEST}/${userId}`
            // logData("passUrl", url)
            const response = await api.post(url, {cardData})
            // logData("response on card-request", response)
            const card = response?.data?.card
            logData("userData on pass", card)
            setItem("card", card)
            return card
        } catch (error) {
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
        
    };

    const getCard = async () => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.GET_CARD}/${userId}`
            // logData("passUrl", url)
            const response = await api.get(url,)
            // logData("response on get-card", response)
            const card = response?.data?.card
            logData("userData on pass", card)
            setItem("card", card)
            return card
        } catch (error) {
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
        
    };

    const makePayment = async (payementData) => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.MAKE_PAYMENT}/${userId}`
            // logData("passUrl", url)
            const response = await api.get(url,payementData )
            // logData("response on get-payment", response)
            const payment = response?.data?.payment
            logData("userData on user payment", payment)
            setItem("payment", payment)
            return payment
        } catch (error) {
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
        
    };

    const getPayment = async () => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.GET_PAYMENT}/${userId}`
            // logData("passUrl", url)
            const response = await api.get(url,)
            // logData("response on get-card", response)
            const payment = response?.data?.payment
            logData("userData on user payment", payment)
            setItem("payment", payment)
            return payment
        } catch (error) {
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
        
    };

    return {userOnApi:user, loading, getUser, update, memberRequest, cardRequest, getCard, makePayment, getPayment};
}

