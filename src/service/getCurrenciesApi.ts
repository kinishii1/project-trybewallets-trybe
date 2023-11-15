const getCurrenciesApi = async () => {
  const response = await fetch(
    'https://economia.awesomeapi.com.br/json/all',
  );
  const currencies = await response.json();
  const keys = Object.keys(currencies);
  const filteredKeys = keys.filter((key) => key !== 'USDT');
  return filteredKeys;
};

export default getCurrenciesApi;
