const initalState = {
    fetching: false,
    fetched: false,
    games: [],
    error: null,
}
export default function reducer(state = initalState, action) {
    switch (action.type) {
        case "FETCH_GAMES_PENDING": {
            return { ...state, fetching: true }
            break;
        }
        case "FETCH_GAMES_REJECTED": {
            return { ...state, fetching: false, error: action.payload.data }
            break;
        }
        case "FETCH_GAMES_FULFILLED": {
            return {
                ...state,
                fetching: false,
                fetched: true,
                games: action.payload.data
            }
            break;
        }

    }
    return state
}
