import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions';
import { validateForm } from '../helpers';
import { FormType } from '../Types';

function Login() {
  const [form, setForm] = useState<FormType>({ email: '', password: '' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const isDisabled = (formToCheck: FormType) => {
  //   validateForm(formToCheck);
  // };

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/carteira');
    dispatch(login(form.email));
  };

  return (
    <form onSubmit={ handleSubmit }>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        data-testid="email-input"
        placeholder="email"
        onChange={ handleChange }
      />
      <label htmlFor="password">Senha</label>
      <input
        type="password"
        id="password"
        name="password"
        data-testid="password-input"
        placeholder="password"
        onChange={ handleChange }
      />
      <button type="submit" disabled={ validateForm(form) }>
        Entrar
      </button>
    </form>
  );
}

export default Login;
