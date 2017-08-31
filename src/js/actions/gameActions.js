import axios from "axios";
import { APIPath } from "./API";

export function setGameTypes(types){
    return {
        type:"SET_GAME_TYPES",
    payload: types
    }
}
export function setPlayerTotal(PlayersTotal){
    return {
        type:"SET_GAME_PLAYERSTOTAL",
        payload: PlayersTotal
    }
}
export function setGameStarted(state){
    return {
        type:"SET_GAME_STARTED",
        payload: state
    }
}
export function setGameIDs(IDs){
    return {
        type:"SET_GAMEIDS",
        payload: IDs
    }
}
export function setGameImages(images){
    return {
        type:"SET_GAME_SETTINGS_IMAGES",
        payload: images
    }
}
export function setPlayerName(PlayerName){
    return {
        type:"SET_PLAYER_NAME",
        payload: PlayerName
    }
}
export function setCompetitive(payload){
    return {
        type:"SET_GAME_COMPETITIVE",
        payload: payload
    }
}
export function setNoQuestions(payload){
    return {
        type:"SET_GAME_NO_QUESTIONS",
        payload: payload
    }
}

export function createGame(payload){
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
    setCookie("playerNumber", payload.playerNumber, 1);
    setCookie("playerName", payload.playerName, 1);
    return {
        
        type:"SET_GAME",
        payload: axios.post(APIPath+"/game/add", payload)
    }
}

export function setCardType(changedDropDown,newType){
    return {
        type:"SET_GAME_CARDTYPE",
        payload: newType,
        itemChanged:changedDropDown
    }
}    
export function setCardTotal(payload, changedSlider,newTotal){
    var sliderchange=15;
    var Totals=[]
    for (var index = 0; index < payload.length; index++){
        if (index!=changedSlider){
        sliderchange=sliderchange-payload[index].cardsTotal
Totals.push(payload[index].cardsTotal)
        }
else{
    sliderchange=sliderchange-newTotal
    Totals.push(newTotal)
}}
    for (var index = 0; index < payload.length; index++) {
    var Total = Totals[index]
if (index!=changedSlider&&sliderchange!=0) {
    var change=Total+sliderchange
    if (change>=0&&change<=15){
            Total=change
            sliderchange=0
        }
        else if (change<0&&Total>0){
        sliderchange = sliderchange+Total
        Total=0
    }
    else if (change>0&&Total<15){
        sliderchange = sliderchange-Total
        Total=15
    }
}
Totals[index]=Total;
}
    var cardsTotal=[{typeID:payload[0].typeID,cardsTotal:Totals[0]},{typeID:payload[1].typeID,cardsTotal:Totals[1]},{typeID:payload[2].typeID,cardsTotal:Totals[2]}];
    return {
        type:"SET_GAME_CATEGORIES",
        payload:cardsTotal
    }
}