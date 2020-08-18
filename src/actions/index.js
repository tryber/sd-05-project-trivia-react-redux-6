export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';

function requestData() {
  return {
    type: REQUEST_DATA,
  };
}

function receiveData(data) {
  return {
    type: RECEIVE_DATA,
    payload: data.results,
  };
}

export default function fetchStarWars() {
  return (dispatch) => {
    dispatch(requestData());
    return (starWarsAPI())
      .then((json) => dispatch(receiveData(json)));
  };
}