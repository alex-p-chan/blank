import axios from "axios";
import { APIPath } from "./API";

export function fetchQuestionTypes(){
    return {
        type:"FETCH_TYPES",
    payload: axios.get(APIPath+"/questions/type")
    }
}
