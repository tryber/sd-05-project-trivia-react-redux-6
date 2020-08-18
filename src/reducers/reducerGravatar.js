import { REQUEST_DATA, RECEIVE_DATA, FAIL_DATA } from '../actions/index';

const initialState = {
  payload: 'grupo legal'
}

export default function reducerGravatar(state = initialState, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        payload: action.payload,
      };
    default:
      return state;
  }
}
