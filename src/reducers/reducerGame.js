import { SCORE_POINT, SAVE_PLAYER, RESET_SCORE } from '../actions';

const initialState = {
  assertions: 0,
  score: 0,
  players: [],
};

export default function reducerGame(state = initialState, action) {
  switch (action.type) {
    case SCORE_POINT:
      return {
        ...state,
        assertions: action.assertions,
        score: action.score,
      };
    case SAVE_PLAYER:
      return {
        ...state,
        players: [...state.players, action.player],
      };
    case RESET_SCORE:
      return {
        ...state,
        assertions: action.assertions,
        score: action.score,
      };
    default:
      return state;
  }
}
