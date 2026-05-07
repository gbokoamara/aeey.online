
import { API_CONFIG } from "../config/api";
import axios from "axios"
import { logData } from "../utils/console";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import { useRedirect } from "./useNavigate";
import { userOnLocal } from "../helper/getUser";

export const useUser = () => {
    const [ loading, setLoading ] = useState(false);
    const {setItem, removeItem} = useLocalStorage();
    const redirect = useRedirect();
    const user = userOnLocal();
    const userId = user.id;
    

    const update = async (updateDate) => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.USER.UPDATE}/${userId}`
            logData("fetchUrl", url)
            const response = await axios.post(url, {updateDate})
            logData("response on update", response)
            const user = response?.data?.user
            logData("userData on login", user)
            // setItem("user", user)
            // return user
        } catch (error) {
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
        
    }

    const memberRequest = async (password, userId) => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.PASSWORD}/${userId}`
            logData("passUrl", url)
            const response = await axios.put(url, {password})
            logData("response on pass", response)
            const user = response?.data?.user
            logData("userData on pass", user)
            setItem("user", user)
            return user
        } catch (error) {
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
        
    };

    const cardRequest = async (password, userId) => {
            logData("password", password)
            logData("userId", userId)

        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.VERIFY_PASSWORD}/${userId}`
            logData("passUrl", url)
            const response = await axios.post(url, {password})
            logData("response on pass", response)
            const isMatch = response?.data?.isMatch
            logData("userData on pass", isMatch)
            // setItem("user", user)
            return isMatch
        } catch (error) {
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
        
    };

    

    return {update, memberRequest, cardRequest};
}

