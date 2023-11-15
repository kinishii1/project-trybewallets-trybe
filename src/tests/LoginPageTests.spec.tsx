import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const testIds = {
  emailInput: 'email-input',
  passwordInput: 'password-input',
  loginButton: 'login-submit-btn',
};

const inputs = {
  email: 'alguem@alguem.com',
  password: '1234567',
};

describe('LoginPage', () => {
  it('renderiza os campos de email e senha', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(testIds.emailInput);
    const passwordInput = screen.getByTestId(testIds.passwordInput);
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });
  it('renderiza um botão com o texto "Entrar"', () => {
    renderWithRouterAndRedux(<App />);
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent(/entrar/i);
  });
  it('renderiza o botão desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });
  it('habilita o botão quando o email e senha são válidos', async () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(testIds.emailInput);
    const passwordInput = screen.getByTestId(testIds.passwordInput);
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
    await userEvent.type(emailInput, inputs.email);
    await userEvent.type(passwordInput, inputs.password);
    expect(loginButton).not.toBeDisabled();
    await userEvent.click(loginButton);
    const carteiraHeading = screen.getByRole('heading', {
      name: /alguem@alguem\.com/i,
    });
    expect(carteiraHeading).toBeInTheDocument();
  });
  it('salva o email no estadoGlobal após o login', async () => {
    const { store } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(testIds.emailInput);
    const passwordInput = screen.getByTestId(testIds.passwordInput);
    const loginButton = screen.getByRole('button', { name: /entrar/i });
    await userEvent.type(emailInput, inputs.email);
    await userEvent.type(passwordInput, '1234567');
    await userEvent.click(loginButton);
    const { user: { email } } = store.getState();
    expect(email).toBe(inputs.email);
  });
});
