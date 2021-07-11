import { combineReducers } from "redux";
import settings from "./settings/reducer";

import authUser from "./auth/reducer";

const reducers = combineReducers({
  settings,
  authUser,
});

export default reducers;
