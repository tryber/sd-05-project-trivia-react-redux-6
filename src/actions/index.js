export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const FAIL_DATA = 'FAIL_DATA';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';

export const requestData = (payload) => ({
  type: REQUEST_DATA,
  payload,
});

export const receiveData = (payload) => ({
  type: RECEIVE_DATA,
  payload,
});

export const failData = (payload) => ({
  type: FAIL_DATA,
  payload,
});

export const loginRequest = (email, name, hash) => ({
  type: LOGIN_REQUEST,
  email,
  name,
  hash,
});

// export function fetchGravatar() {
//   return (dispatch) => {
//     dispatch(requestData());
//     return 
//   }
// }
