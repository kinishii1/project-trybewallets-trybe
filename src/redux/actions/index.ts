import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

// Coloque aqui suas actions
export const LOGIN = "LOGIN";

export const login = (email: string) => ({
  type: LOGIN,
  payload: email,
});


export const ADD_EXPENSES = "ADD_EXPENSES";

export const addExpenses = (expenses: any) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

export const SAVE_TOTAL = "SAVE_TOTAL";

export const saveTotal = (total: number) => ({
  type: SAVE_TOTAL,
  payload: total,
});

export const DELETE_EXPENSE = "DELETE_EXPENSE";

export const deleteExpense = (id: number) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const FAILED_REQUEST = "FAILED_REQUEST";
export const START_REQUEST = "START_REQUEST";
export const ADD_CURRENCIES = "ADD_CURRENCIES";
export const ADD_EXCHANGE_RATES = "ADD_EXCHANGE_RATES";

const addCurrencies = (currencies: any) => ({
  type: ADD_CURRENCIES,
  payload: currencies,
});

// const exchangeRates = (rates: any) => ({
//   type: ADD_EXCHANGE_RATES,
//   payload: rates,
// });

const failedRequest = (error: any) => ({
  type: FAILED_REQUEST,
  payload: error,
});

const startRequest = () => ({
  type: START_REQUEST,
});

export const fetchCurrencies =
  () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(startRequest());
      const response = await fetch(
        "https://economia.awesomeapi.com.br/json/all"
      );
      const currencies = await response.json();
      const keys = Object.keys(currencies);
      const filteredKeys = keys.filter((key) => key !== "USDT");
      dispatch(addCurrencies(filteredKeys));
    } catch (error: any) {
      dispatch(failedRequest(error.message));
    }
  };

// export const fetchExchangeRates =
//   () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
//     try {
//       dispatch(startRequest());
//       const response = await fetch(
//         "https://economia.awesomeapi.com.br/json/all"
//       );
//       const currencies = await response.json();
//       console.log(currencies);
//       dispatch(exchangeRates(currencies));
//     } catch (error: any) {
//       dispatch(failedRequest(error.message));
//     }
//   };
