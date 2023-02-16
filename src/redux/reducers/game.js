import { SEND_SECONDS } from '../actions';

const INITIAL_STATE = {
  seconds: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_SECONDS:
    return { ...state, seconds: action.payload };
  default:
    return state;
  }
};

export default game;
