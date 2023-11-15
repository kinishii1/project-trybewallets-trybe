import { AnyAction } from 'redux';
import { WalletState } from '../../Types';
import {
  ADD_EXPENSES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SET_EDITING,
  ADD_CURRENCIES,
} from '../actions';

const INITIAL_STATE: WalletState = {
  currencies: [],
  expenses: [],
  loading: false,
  error: '',
  editing: false,
  editingId: 0,
};

const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case ADD_EXPENSES:
      return {
        ...state,
        expenses: [
          ...state.expenses,
          { id: state.expenses.length, ...action.payload },
        ],
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense: any) => expense.id !== action.payload,
        ),
      };
    case EDIT_EXPENSE:
      return {
        ...state,
        editing: false,
        expenses: state.expenses.map((expense: any) => {
          if (expense.id === state.editingId) {
            return {
              ...expense,
              ...action.payload,
            };
          }
          return expense;
        }),
      };
    case SET_EDITING:
      return {
        ...state,
        editing: action.payload,
        editingId: action.editingId,
      };
    case ADD_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default wallet;
