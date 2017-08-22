const initalState = {
    fetching: false,
    fetched: false,
    users:[],
    error:null,
    }
    
export default function reducer(state=initalState, action){
        switch(action.type){
        case "FETCH_USERS_PENDING":{
    return {...state, fetching:true}
            break;
        }
        case "FETCH_USERS_REJECTED":{
            return {...state, fetching:false, error:action.payload}
            break;
                }
                case "FETCH_USERS_FULFILLED":{
                    return{...state, 
                        fetching:false,
                        fetched:true,
                        users:action.payload.data,}
                    break;
                        }
                    
    }
    return state
    }
    