import {
  RESET_POINTS,
  SAVE_USER_NAME,
  UPDATE_ASSERTIONS,
  UPDATE_SCORE,
} from '../actions';

const INITIAL_STATE = {
  name: '',
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_USER_NAME:
    return { ...state, name: payload.name };
  case UPDATE_SCORE:
    return { ...state, score: state.score + payload.score };
  case UPDATE_ASSERTIONS:
    return { ...state, assertions: state.assertions + 1 };
  case RESET_POINTS:
    return { score: 0, assertions: 0 };
  default:
    return state;
  }
};

export default player;
