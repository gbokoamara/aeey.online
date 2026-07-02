// src/helpers/formatNumber.js

export const formatNumber = (value) => {
  return new Intl.NumberFormat('fr-FR').format(value || 0);
};