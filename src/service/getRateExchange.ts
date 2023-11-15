const getRateExchange = async () => {
  const rates = await fetch(
    "https://economia.awesomeapi.com.br/json/all"
  ).then((response) => response.json());
  return rates;
};

export default getRateExchange;