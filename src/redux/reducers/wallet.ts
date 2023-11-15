import { AnyAction } from "redux";
import { WalletState } from "../../Types";

const INITIAL_STATE: WalletState = {
  currencies: [],
  expenses: [],
  loading: false,
  error: "",
  editing: false,
  editingId: 0,
};

const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case "ADD_EXPENSES":
      return {
        ...state,
        expenses: [
          ...state.expenses,
          { id: state.expenses.length, ...action.payload },
        ],
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense: any) => expense.id !== action.payload
        ),
      };
    case "EDIT_EXPENSE":
      return {
        ...state,
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
    case "SET_EDITING":
      return {
        ...state,
        editing: action.payload,
        editingId: action.editingId,
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
