const initalState = {
    fetching: false,
    fetched: false,
    error: null,
    game: {
        types: [{ typeID: 1, cardsTotal: 5 }, { typeID: 2, cardsTotal: 5 }, { typeID: 3, cardsTotal: 5 }],
        gameID: 0,
        started: false,
        playerNumber: 1,
        playersTotal: 5,
        competitive: false,
        noQuestions: false,
        playerName: "",
        settings: {
            images: false,
        },
    },
}
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case "SET_GAME_FULFILLED": {
            function setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
              }
            setCookie("gameID", action.payload.data.gameID, 1);
        
            return {
                ...state,
                game: {
                    ...state.game,
                    gameID: action.payload.data.gameID,
                    started: true,
                },
            }
            break;
        }
        case "SET_PLAYER_NAME": {
            return {
                ...state,
                game: {
                    ...state.game,
                    playerName: action.payload
                },
            }
            break;
        }
        case "SET_GAMEIDS": {
            return {
                ...state,
                game: {
                    ...state.game,
                    playerName: action.payload.playerName,
                    playerNumber: action.payload.playerNumber,
                    gameID: action.payload.gameID,
                },
            }
            break;
        }
        case "SET_GAME_STARTED": {
            return {
                ...state,
                game: { ...state.game, started: action.payload },
            }
            break;
        }
        case "SET_GAME_PLAYERSTOTAL": {
            return {
                ...state,
                game: { ...state.game, playersTotal: action.payload },
            }
            break;
        }
        //reset state for join game or gamesetup screens
        case "FETCH_TYPES_FULFILLED":
        case "FETCH_GAMES_FULFILLED":
        return{...state,
            fetching: false,
            fetched: false,
            error: null,
                    game: { ...state.game,
                gameID: 0,
                started: false,
             },

            
        }
        case "FETCH_GAME_FULFILLED": {
            if (action.payload.data.rejoin)
            {
               const competitive=action.payload.data.gameMode?true:false;
                return {
                ...state,
                game: { ...state.game, playersTotal: action.payload.data.playersTotal, started:true,
                    competitive: competitive},
            }}
            else{
                return state;
            }
            break;
        }
        case "SET_GAME_CATEGORIES": {
            return {
                ...state,
                game: { ...state.game, types: action.payload },
            }
            break;
        }
        case "SET_GAME_SETTINGS_IMAGES": {
            return {
                ...state,
                game: { ...state.game,
                    settings:{...state.game.settings,
                        images: action.payload
                    }},
            }
            break;
        }
        case "SET_GAME_COMPETITIVE": {
            return {
                ...state,
                game: {
                    ...state.game,
                    competitive: action.payload,
                },
            }
            break;
        }
        case "SET_GAME_NO_QUESTIONS": {
            return {
                ...state,
                game: {
                    ...state.game,
                    noQuestions: action.payload,
                },
            }
            break;
        }
        case "SET_GAME_TYPES_FULFILLED": {
            return {
                ...state,
                game: {
                    ...state.game,
                    types: action.payload.data,
                },
            }
            break;
        }
        case "SET_GAME_CARDTYPE": {
            return {
                ...state,
                game: {
                    ...state.game,
                    types: state.game.types.map(
                        (type, i) => i === action.itemChanged ? { ...type, typeID: action.payload }
                            : type
                    )
                },
            }
            break;
        }

        case "JOIN_GAME_PENDING": {
            return { ...state, fetching: true }
            break;
        }
        case "JOIN_GAME_REJECTED": {
            return { ...state, fetching: false, error: action.payload.data }
            break;
        }
        case "JOIN_GAME_FULFILLED": {
            function setCookie(cname, cvalue, exdays) {
                var d = new Date();
                d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + d.toUTCString();
                document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
              }
              setCookie("playerNumber", action.payload.data.playerNumber, 1);

              return {
                ...state,
                fetching: false,
                fetched: true,
                game: {
                    ...state.game,
                    competitive: action.payload.data.competitive,
                    playersTotal: action.payload.data.playersTotal,
                    playerNumber: action.payload.data.playerNumber,
                    gameID: action.payload.data.gameID,
                    started: true,
                }
            }
            break;
        }
    }
    return state
}
