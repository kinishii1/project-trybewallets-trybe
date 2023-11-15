export type Currency = {
  code: string,
  codein: string,
  name: string,
  high: string,
  low: string,
  varBid: string,
  pctChange: string,
  bid: string,
  ask: string,
  timestamp: string,
  create_date: string,
};

export type Expense = {
  id: number,
  value: number,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: Currency,
};

export type WalletState = {
  expenses: Expense[],
  currencies: string[],
  loading: boolean,
  error: string,
  editing: boolean,
  editingId: number,
};

export type UserState = {
  email: string,
};

export type RootState = {
  user: UserState,
  wallet: WalletState,
};

export type FormType = {
  email: string;
  password: string;
};
