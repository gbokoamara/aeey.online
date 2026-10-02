

export const URLSearchHelper = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token")
    return token;
}