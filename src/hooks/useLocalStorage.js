
export const useLocalStorage = () => {
  const setItem = (key, value) => {
    localStorage.setItem(`${key}Key`, JSON.stringify(value));
  };

  const getItem = (key) => {
    const item = localStorage.getItem(`${key}Key`);

    if (item === null || item === undefined || item === "undefined") {
      return null;
    }

    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(`Erreur lors de la lecture de "${key}Key" :`, error);

      // Supprime la valeur corrompue
      localStorage.removeItem(`${key}Key`);

      return null;
    }
  };

  const removeItem = (key) => {
    localStorage.removeItem(`${key}Key`);
  };

  const clear = () => {
    localStorage.clear();
  };

  return {
    setItem,
    getItem,
    removeItem,
    clear,
  };
};

