const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
  currencyName: "BRL",
  loading: false,
  error: "",
};

const wallet = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "ADD_EXPENSES":
      return {
        ...state,
        expenses: [
          ...state.expenses,
          { id: state.expenses.length, ...action.payload },
        ],
        currencyName: action.payload.currency,
      };
    // case "SAVE_TOTAL":
    //   return {
    //     ...state,
    //     total: action.payload,
    //   };
    case "ADD_EXCHANGE_RATES":
      return {
        ...state,
        exchangeRates: action.payload,
        loading: false,
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense: any) => expense.id !== action.payload
        ),
      };
    case "ADD_CURRENCIES":
      return {
        ...state,
        currencies: action.payload,
        loading: false,
      };
    case "FAILED_REQUEST":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case "START_REQUEST":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default wallet;
