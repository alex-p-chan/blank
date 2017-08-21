const initalState = {
    fetching: false,
    fetched: false,
    gameSetup: {
        types: [{typeID:1,cardsTotal:5},{typeID:2,cardsTotal:5},{typeID:3,cardsTotal:5}],
        playersTotal:5,
        started: false,
        competitive:true,
    },
    error: null,
}
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case "SET_GAME_PENDING": {
            return { ...state, fetching: true }
            break;
        }
        case "SET_GAME_REJECTED": {
            return { ...state, fetching: false, error: action.payload }
            break;
        }
        case "SET_GAME_PLAYERSTOTAL": {
            return {
                ...state,
                gameSetup: {...state.gameSetup,playersTotal:action.payload},
            }
            break;
        }
        case "SET_GAME_CATEGORIES": {
            return {
                ...state,
                gameSetup: {...state.gameSetup,types:action.payload},
            }
            break;
        }        
        case "SET_GAME_COMPETITIVE": {
            return {
                ...state,
                gameSetup: {...state.gameSetup,
                    competitive: action.payload,
            },
            }
            break;
        }
        case "SET_GAME_TYPES_FULFILLED": {
            return {
                ...state,
                gameSetup: {
                    types: action.payload.data,
            },
            }
            break;
        }
        case "SET_GAME_CARDTYPE": {
            return {
                ...state,
                gameSetup: {...state.gameSetup,types:state.gameSetup.types.map(
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
                                started:true,}
                            break;
                                }
                            
    }
    return state
}
