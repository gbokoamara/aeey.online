
export const formatError = (error, defaultMessage= "Impossible d'approuver cette dépense") => {
    const message = error?.response?.data?.message || error?.response?.data?.error || defaultMessage;
    const vote = error?.response?.data?.vote 
    return {message, vote};
}