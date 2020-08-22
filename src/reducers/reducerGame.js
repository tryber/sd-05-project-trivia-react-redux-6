import { SCORE_POINT } from "../actions";

const initial_state = {
  assertions: 0,
  score: 0,
}

export default function reducerGame(state = initial_state, action) {
  switch (action.type) {
    case SCORE_POINT:
      return {
        ...state,
        assertions: action.assertions,
        score: action.score,
      }
    default:
      return state;
  }
}
