import { FormType } from '../Types';

const validateForm = (formToCheck: FormType) => {
  const { email, password } = formToCheck;
  const regex = /\S+@\S+\.\S+/;
  const SIX = 6;
  return !(regex.test(email) && password.length >= SIX);
};

export default validateForm;
