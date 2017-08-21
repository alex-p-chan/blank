const initalState = {
    fetching: false,
    fetched: false,
    types:[],
    error:null,
    }
export default function reducer(state=initalState, action){
        switch(action.type){
        case "FETCH_TYPES_PENDING":{
    return {...state, fetching:true}
            break;
        }
        case "FETCH_TYPES_REJECTED":{
            return {...state, fetching:false, error:action.payload}
            break;
                }
                case "FETCH_TYPES_FULFILLED":{
                    return{...state, 
                        fetching:false,
                        fetched:true,
                        types:action.payload.data,}
                    break;
                        }
                    
    }
    return state
    }
    