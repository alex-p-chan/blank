const initalState = {
    fetching: false,
    fetched: false,
    game: {
        types: [{typeID:1,cardsTotal:5},{typeID:2,cardsTotal:5},{typeID:3,cardsTotal:5}],
        playersTotal:5,
        started: false,
        competitive:true,
        playerNumber: 1,
        playerName:"",
        gameID:0,
        settings:{
        imgOn:false,
    },
        round: {
            playersReady:0,
            blank:"",
            image:"",
            answers:[]
        },
    },
    error: null,
}

export default function reducer(state = initalState, action) {
    switch (action.type) {
        case "SET_GAME_FULFILLED":{
            return{...state, 
                started:true,
                game: {...state.game,
                gameID:action.payload.data.gameID},
            }
            break;
    }
    case "SET_PLAYER_NAME":{
        return{...state, 
            game: {...state.game,
            playerName:action.payload
        },
        }
        break;
}
case "SET_BLANK":{
    return{...state, 
        game: {...state.game,
round:{...state.game.round,


}
    },
    }
    break;
}   
        case "SET_GAME_PLAYERSTOTAL": {
            return {
                ...state,
                game: {...state.game,playersTotal:action.payload},
            }
            break;
        }
        case "SET_GAME_CATEGORIES": {
            return {
                ...state,
                game: {...state.game,types:action.payload},
            }
            break;
        }        
        case "SET_GAME_COMPETITIVE": {
            return {
                ...state,
                game: {...state.game,
                    competitive: action.payload,
            },
            }
            break;
        }
        case "SET_GAME_TYPES_FULFILLED": {
            return {
                ...state,
                game: {...state.game,
                    types: action.payload.data,
            },
            }
            break;
        }
        case "SET_GAME_CARDTYPE": {
            return {
                ...state,
                game: {...state.game,types:state.game.types.map(
                    (type, i) => i === action.itemChanged ? {...type, typeID: action.payload}
                                            : type
                )},
            }
            break;
        }
        case "FETCH_GAME_PENDING":{
            return {...state, fetching:true}
                    break;
                }
        case "FETCH_GAME_REJECTED":{
                    return {...state, fetching:false, error:action.payload}
                    break;
                        }
        case "FETCH_GAME_FULFILLED":{
                            return{...state, 
                                fetching:false,
                                fetched:true,
                                game: {...state.game,
                                    round:{...state.game.round,
                                        image:action.payload.data.image,
                                        blank:action.payload.data.blank,
                                    }
                            }
                            }
                            break;
                    }
                    case "JOIN_GAME_PENDING":{
                        return {...state, fetching:true}
                                break;
                            }
                    case "JOIN_GAME_REJECTED":{
                                return {...state, fetching:false, error:action.payload.data}
                                break;
                                    }
                    case "JOIN_GAME_FULFILLED":{
                        return{...state, 
                            fetching:false,
                            fetched:true,
                            game:{...state.game, 
                            competitive:action.payload.data.competitive,
                            playersTotal:action.payload.data.playersTotal,
                            round:{...state.game.round,
                            playersReady:action.payload.data.playersReady,
                        }
                    }
                        }
                        break;
                    }
}
return state
}
