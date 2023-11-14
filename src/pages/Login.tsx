import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootReducer } from "../types";
import { login } from "../redux/actions";
import { useNavigate } from "react-router-dom";

type FormType = {
  email: string;
  password: string;
};

function Login() {
  const { email: emailState } = useSelector((state: RootReducer) => state.user);
  console.log(emailState);
  const [form, setForm] = useState<FormType>({ email: emailState, password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const isDisabled = (formToCheck: FormType) => {
    const { email, password } = formToCheck;
    const regex = /\S+@\S+\.\S+/;
    const SIX = 6;
    return !(regex.test(email) && password.length >= SIX);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/carteira');
    dispatch(login(form.email));
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        type="email"
        name="email"
        data-testid="email-input"
        placeholder="email"
        onChange={ handleChange }
      />
      <input
        type="password"
        name="password"
        data-testid="password-input"
        placeholder="password"
        onChange={ handleChange }
      />
      <button type="submit" disabled={ isDisabled(form) }>
        Entrar
      </button>
    </form>
  );
}

export default Login;
