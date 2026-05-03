import { useLocalStorage } from "../hooks/useLocalStorage"

export const userOnLocal = () => {
    const {getItem} = useLocalStorage()
    const user = getItem("user")
    return user
}