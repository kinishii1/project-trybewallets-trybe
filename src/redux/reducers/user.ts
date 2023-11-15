import { AnyAction } from 'redux';
import { UserState } from '../../Types';
import { LOGIN } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE: UserState = {
  email: '',
};

const user = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        email: action.payload,
      };
    default:
      return state;
  }
};

export default user;
