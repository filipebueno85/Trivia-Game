import { apiRequestQuestions } from '../../services/api';

export const USER_INFO = 'USER_INFO';
// export const GET_QUESTIONS = 'GET_QUESTIONS';

export const requestUser = (info) => ({
  type: USER_INFO,
  payload: info,
});

export const SAVE_USER_NAME = 'SAVE_USER_NAME';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_ASSERTIONS = 'UPDATE_ASSERTIONS';
export const SEND_SECONDS = 'SEND_SECONDS';
export const UPDATE_RANKING = 'UPDATE_RANKING';
export const RESET_POINTS = 'RESET_POINTS';

export function saveUserName(payload) {
  return {
    type: SAVE_USER_NAME,
    payload,
  };
}
export function updateScore(payload) {
  return {
    type: UPDATE_SCORE,
    payload,
  };
}

export function updateAssertions() {
  return {
    type: UPDATE_ASSERTIONS,
  };
}

export function sendSeconds(payload) {
  return {
    type: SEND_SECONDS,
    payload,
  };
}

export function updateRanking(payload) {
  return {
    type: UPDATE_RANKING,
    payload,
  };
}

export function resetPoints() {
  return {
    type: RESET_POINTS,
  };
}

export const fetchAPI = () => async (dispatch) => {
  const apiGameCall = await apiRequestQuestions();
  dispatch(apiGameCall);
};
