export const formatPhoneNumber = (value) => {
  // Garde uniquement les chiffres
  const numbers = value.replace(/\D/g, "").slice(0, 10);

  // Regroupe par 2 chiffres
  return numbers.match(/.{1,2}/g)?.join(" ") || "";
};