import { useLocalStorage } from "../hooks/useLocalStorage"

export const userOnLocal = () => {
    const {getItem} = useLocalStorage()
    const user = getItem("user")
    return user
}

export const memberOnLocal = () => {
    const {getItem} = useLocalStorage()
    const member = getItem("member")
    return member
}
export const EventsOnLocal = () => {
    const {getItem} = useLocalStorage()
    const events = getItem("events")
    return events
}
