import axios from "axios";

export function fetchUsers(){
    return {
        type:"FETCH_USERS",
    payload: axios.get("http://localhost/blank/api/public/users")
    }
}
export function fetchUser(id){
    return {
        type:"FETCH_USER",
    payload: axios.get("http://localhost/blank/api/public/user/"+id)
    }
}