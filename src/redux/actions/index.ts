import { ThunkDispatchType } from '../../Types';
import getCurrenciesApi from '../../service/getCurrenciesApi';

// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SET_EDITING = 'SET_EDITING';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const START_REQUEST = 'START_REQUEST';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXCHANGE_RATES = 'ADD_EXCHANGE_RATES';

export const login = (email: string) => ({
  type: LOGIN,
  payload: email,
});

export const addExpenses = (expenses: any) => ({
  type: ADD_EXPENSES,
  payload: expenses,
});

export const deleteExpense = (id: number) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const editExpense = (expense: any) => ({
  type: EDIT_EXPENSE,
  payload: expense,
});

export const setEditing = (editing: boolean, id: number) => ({
  type: SET_EDITING,
  payload: editing,
  editingId: id,
});

const addCurrencies = (currencies: any) => ({
  type: ADD_CURRENCIES,
  payload: currencies,
});

// const failedRequest = (error: any) => ({
//   type: FAILED_REQUEST,
//   payload: error,
// });

// const startRequest = () => ({
//   type: START_REQUEST,
// });

export const fetchCurrencies = () => async (dispatch: ThunkDispatchType) => {
  try {
    // dispatch(startRequest());
    // const response = await fetch(
    //   'https://economia.awesomeapi.com.br/json/all',
    // );
    // const currencies = await response.json();
    // const keys = Object.keys(currencies);
    // const filteredKeys = keys.filter((key) => key !== 'USDT');
    const currencyKeys = await getCurrenciesApi();
    dispatch(addCurrencies(currencyKeys));
  } catch (error: any) {
    // dispatch(failedRequest(error.message));
    console.log(error.message);
  }
};
