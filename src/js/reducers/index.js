import {combineReducers} from "redux"
import users from "./usersReducer"
import user from "./userReducer"
import questionTypes from "./questionTypesReducer"
import gameSetup from "./gameReducer"

export default combineReducers({
    users, user, questionTypes,gameSetup
})