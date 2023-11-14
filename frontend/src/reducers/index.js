import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { currentUserReducer } from "./currentUserReducer";
import { questionsReducer } from "./questionReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
    authReducer,
    currentUserReducer,
    questionsReducer,
    userReducer,
});
