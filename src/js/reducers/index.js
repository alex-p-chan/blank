import {combineReducers} from "redux"
import users from "./usersReducer"
import user from "./userReducer"
import questionTypes from "./questionTypesReducer"
import game from "./gameReducer"
import games from "./gamesReducer"
import round from "./roundReducer"
import players from "./playersReducer"
export default combineReducers({
    users, user, questionTypes,game,games,round,players,
})