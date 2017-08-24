import axios from "axios";
import { APIPath } from "./API";

export function fetchScores(id){
    return {
        type:"FETCH_TYPES",
    payload: axios.get(APIPath+"/player/score/"+id)
    }
}
export function setVote(playerNumber){
    return {
        type:"SET_PLAYER_VOTED",
    payload: playerNumber
    }
}