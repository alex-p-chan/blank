import axios from "axios";
import { APIPath } from "./API";

export function fetchOpenGames(){
    return {
        type:"FETCH_GAMES",
        payload: axios.get(APIPath+"/games")
    }
}
export function joinGame(payload){
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
      setCookie("gameID", payload.gameID, 1);
    setCookie("playerName", payload.playerName, 1);
    return {
        type:"JOIN_GAME",
        payload: axios.post(APIPath+"/game/player/add", payload)
    }

}