export type Currency = {
  currency: string,
  code: string,
  ask: number,
  bid: number,
  timestamp: number,
  create_date: string,
};

export type Expense = {
  id: number,
  value: number,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: any,
};

export type WalletState = {
  expenses: Expense[],
  currencies: Currency[],
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
