
export const dateUi = (date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
}