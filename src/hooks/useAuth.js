
import { API_CONFIG } from "../config/api";
import axios from "axios"
import { logData } from "../utils/console";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";
import { useRedirect } from "./useNavigate";

export const useAuth = () => {
    const [ loading, setLoading ] = useState(false)
    const {setItem, removeItem} = useLocalStorage()
    const redirect = useRedirect()

    const login = async (firstName, number) => {
        setLoading(true)
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.REGISTER}`
            logData("fetchUrl", url)
            const response = await axios.post(url, {firstName, number})
            const user = response?.data?.user
            logData("userData on login", user)
            setItem("user", user)
            return user
        } catch (error) {
            console.error("login error", error)
        } finally {
            setLoading(false)
        }
        
    }

    const createPin = async (password, userId) => {
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

    const verifyPin = async (password, userId) => {
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

    const logout = (user) => {
        removeItem(user);
        redirect("/")
    }

    return {login, createPin, logout, verifyPin};
}

