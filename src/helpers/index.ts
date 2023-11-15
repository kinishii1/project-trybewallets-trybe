import { FormType } from '../Types';

export const validateForm = (formToCheck: FormType) => {
  const { email, password } = formToCheck;
  const regex = /\S+@\S+\.\S+/;
  return !(regex.test(email) && password.length >= 6);
};

export const toFixedTwo = (number: number) => {
  return Number(number).toFixed(2);
};
