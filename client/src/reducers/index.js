import {combineReducers} from "redux";
import { authReducer } from "./reducers";

const rootReducer = combineReducers({
    redux_auth: authReducer
})

export default rootReducer;