
export const useLocalStorage = () => {
    const setItem = (key, value) => {
        localStorage.setItem(`${key}Key`, JSON.stringify(value))
    }

    const getItem = (key) => {
        const item = localStorage.getItem(`${key}Key`)
        return item ? JSON.parse(item) : null
    }

    const removeItem = (key) => {
        localStorage.removeItem(`${key}Key`)
    }

    return {setItem, getItem, removeItem}
}