import {
  SET_PLAYER_NAME,
  SET_PLAYER_TOTAL_SCORE,
  SET_SUBMIT,
  SET_TIMER
} from "actions/types.js";

export const setPlayerName = player => dispatch => {
  dispatch({
    type: SET_PLAYER_NAME,
    payload: player
  });
};

export const setPlayerTotalScore = totalScore => dispatch => {
  dispatch({
    type: SET_PLAYER_TOTAL_SCORE,
    payload: totalScore
  });
};

export const setSubmit = () => dispatch => {
  dispatch({
    type: SET_SUBMIT
  });
};

export const setTimer = timer => dispatch => {
  dispatch({
    type: SET_TIMER,
    timer: timer
  });
};
