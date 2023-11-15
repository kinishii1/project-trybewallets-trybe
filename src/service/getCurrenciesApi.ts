import url from './urlApi';

const getCurrenciesApi = async () => {
  const response = await fetch(url);
  const currencies = await response.json();
  const keys = Object.keys(currencies);
  const filteredKeys = keys.filter((key) => key !== 'USDT');
  return filteredKeys;
};

export default getCurrenciesApi;
