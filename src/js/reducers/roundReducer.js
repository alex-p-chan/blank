const initalState = {
    fetching: false,
    fetched: false,
    error: null,
    round: {
        gameID:0,
        playersReady: 0,
        blank: "",
        image: "",
        cardID:0,
        playerVoted:0,
        answers: [{key:0,value:""}, {key:1,value:""}, {key:2,value:""}],
    },
}
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case "SET_GAME_FULFILLED": {
            return {
                ...state,
                round: {
                    ...state.round,
                    gameID: action.payload.data.gameID
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
            return {
                ...state,
                fetching: false,
                fetched: true,
                    round: {
                        ...state.round,
                        playersReady: action.payload.data.playersReady,
                    }
            }
            break;
        }
        case "FETCH_GAME_PENDING": {
            return { ...state, fetching: true }
            break;
        }
        case "FETCH_GAME_REJECTED": {
            return { ...state, fetching: false, error: action.payload }
            break;
        }

        case "FETCH_GAME_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                       round: {
                        ...state.round,
                        image: action.payload.data.image,
                        blank: action.payload.data.blank,
                        playersReady:action.payload.data.playersReady,
                        cardID:action.payload.data.cardID,
                    }
            }
            break;
        }
        case "SET_BLANK": {
            return {
                ...state,
                    round: {
                        ...state.round,
                        answers: state.round.answers.map(
                            (answer, i) => i === action.itemChanged ? action.payload : answer)
                },
            }
            break;
        }
        case "END_TURN_FULFILLED": {
            return {
                ...state,
                    round: {
                        ...state.round,
            playersReady:0
                },
            }
            break;
        }
        
    }
    return state
}