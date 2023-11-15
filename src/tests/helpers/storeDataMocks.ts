import mockData from './mockData';

export const walletState = {
  wallet: {
    currencies: Object.keys(mockData),
    expenses: [
      {
        id: 1,
        value: 5,
        description: 'teste',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
    ],
    total: 0,
  },
};

export const emailState = {
  user: {
    email: 'alguem@alguem.com',
  },
};
