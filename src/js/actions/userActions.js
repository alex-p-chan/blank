import axios from "axios";
import { APIPath } from "./API";
export function fetchUsers(){
    return {
        type:"FETCH_USERS",
    payload: axios.get(APIPath+"/users")
    }
}
export function fetchUser(id){
    return {
        type:"FETCH_USER",
    payload: axios.get(APIPath+"/user/"+id)
    }
}
