const initalState = {
    fetching: false,
    fetched: false,
    error: null,
    players: [
           { 
            playerNumber:0,
            playerName:"",
            playerScore:0,
        },
        ],
}

export default function reducer(state = initalState, action) {
    switch (action.type) {
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
                players: action.payload.data.scorePlayer,                    
            }
            break;
        }
    }
    return state
    
}
