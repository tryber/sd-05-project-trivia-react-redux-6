import { getQuestionsAPI, getTokenTriviaAPI } from '../services/triviaAPI';

export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const FAIL_DATA = 'FAIL_DATA';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const RECEIVE_TOKEN = 'RECEIVE_TOKEN';

export const requestData = () => ({
  type: REQUEST_DATA,
  loading: true,
});

export const receiveData = (results) => ({
  type: RECEIVE_DATA,
  loading: false,
  results,
});

export const failData = (error) => ({
  type: FAIL_DATA,
  loading: false,
  error,
});

export const loginRequest = (email, name, hash) => ({
  type: LOGIN_REQUEST,
  email,
  name,
  hash,
});

export const receiveToken = (token) => ({
  type: RECEIVE_TOKEN,
  token,
});

export function fetchToken() {
  return (dispatch) => {
    return getTokenTriviaAPI()
      .then((token) => dispatch(receiveToken(token)));
  };
};

export function fetchQuestions(token) {
  return (dispatch) => {
    dispatch(requestData());
    return getQuestionsAPI(token)
      .then(
        (data) => dispatch(receiveData(data.results)),
        (error) => dispatch(failData(error)),
      );
  };
};
