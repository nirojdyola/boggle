import { combineReducers } from "redux";

import GameReducer from "./gameReducer";

export default combineReducers({ games: GameReducer });
