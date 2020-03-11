import {
  SET_PLAYER_NAME,
  SET_PLAYER_TOTAL_SCORE,
  SET_SUBMIT,
  SET_TIMER
} from "actions/types";

const initialState = {
  player: "",
  totalScore: 0,
  submit: false,
  timer: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_PLAYER_NAME:
      return {
        ...state,
        player: action.payload
      };
    case SET_PLAYER_TOTAL_SCORE:
      return {
        ...state,
        totalScore: action.payload
      };
    case SET_SUBMIT:
      return {
        ...state,
        submit: true
      };
    case SET_TIMER:
      return {
        ...state,
        timer: action.timer
      };
    default:
      return state;
  }
}
