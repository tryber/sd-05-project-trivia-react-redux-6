import { LOGIN_REQUEST } from '../actions/index';

const initialState = {
  email: '',
  name: '',
  hash: '',
}

export default function reducerGravatar(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        email: action.email,
        name: action.name,
        hash: action.hash,
      };
    default:
      return state;
  }
}
