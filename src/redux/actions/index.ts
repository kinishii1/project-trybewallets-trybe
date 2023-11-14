// Coloque aqui suas actions
export const LOGIN = 'LOGIN';

export const login = (email: string) => ({
  type: LOGIN,
  payload: email,
});