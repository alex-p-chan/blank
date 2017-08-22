import axios from "axios";
import { APIPath } from "./API";
export function queueGame(payload){
    return {
        type:"FETCH_GAME",
        payload: axios.post(APIPath+"/game/player/queue", payload)
    }
}
export function setBlank(key, value){
    return {
        type:"SET_BLANK",
        payload: {key:key,
            value:value
        },
        itemChanged:key,
    }
}
export function endTurn(payload){
    return {
        type:"END_TURN",
        payload: axios.post(APIPath+"/game/round/end", payload)
    }
}


