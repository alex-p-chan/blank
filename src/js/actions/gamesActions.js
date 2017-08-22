import axios from "axios";
import { APIPath } from "./API";

export function fetchOpenGames(){
    return {
        type:"FETCH_GAMES",
        payload: axios.get(APIPath+"/games")
    }
}
export function joinGame(gameID){
    return {
        type:"JOIN_GAME",
        payload: axios.post(APIPath+"/game/player/add", gameID)
    }
}