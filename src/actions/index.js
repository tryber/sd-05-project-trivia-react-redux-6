const REQUEST_DATA = 'REQUEST_DATA';
const RECEIVE_DATA = 'RECEIVE_DATA';
const FAIL_DATA = 'FAIL_DATA';

export const requestData = (payload) => ({
  type: REQUEST_DATA,
  payload,
})

export const receiveData = (payload) => ({
  type: RECEIVE_DATA,
  payload,
})

export const failData = (payload) => ({
  type: FAIL_DATA,
  payload,
})
