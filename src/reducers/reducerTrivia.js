import { REQUEST_DATA, RECEIVE_DATA, FAIL_DATA, RECEIVE_TOKEN } from '../actions/index';

const INITIAL_STATE = {
  loading: true,
  results: [],
  error: '',
  token: '', // voltar pra vazio depois
};

export default function reducerTrivia(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        loading: action.loading,
      };
    case RECEIVE_DATA:
      return {
        ...state,
        loading: action.loading,
        results: action.results,
      };
    case FAIL_DATA:
      return {
        ...state,
        loading: action.loading,
        error: action.error,
      };
    case RECEIVE_TOKEN:
      return {...state, token: action.token};
    default:
      return state;
  }
}
