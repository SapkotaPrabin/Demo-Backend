export const validateEmail = (email: string): boolean => {
  return !!email && /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
};

export const validateNumber = (number: number | string | null): boolean => {
  return !!number && /^\d{10}$/.test(number.toString());
};
