import { FormType } from '../Types';

export const validateForm = (formToCheck: FormType) => {
  const { email, password } = formToCheck;
  const regex = /\S+@\S+\.\S+/;
  const SIX = 6;
  return !(regex.test(email) && password.length >= SIX);
};

export const toFixedTwo = (number: number) => {
  return Number(number).toFixed(2);
};
