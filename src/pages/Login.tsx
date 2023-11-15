import { validateForm } from '../helpers';
import useLoginForm from '../hooks/useLoginForm';

function Login() {
  const { loginState, handleChange, handleSubmit } = useLoginForm();
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
      <button type="submit" disabled={ validateForm(loginState) }>
        Entrar
      </button>
    </form>
  );
}

export default Login;
