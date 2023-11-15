import url from './urlApi';

const getRateExchange = async () => {
  const rates = await fetch(url);
  const response = await rates.json();
  return response;
};

export default getRateExchange;
