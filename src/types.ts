export type UserReducer = {
  email: string;
};

export type WalletReducer = {
  currencies: [];
  expenses: [];
};

export type RootReducer = {
  user: UserReducer;
  wallet: WalletReducer;
};