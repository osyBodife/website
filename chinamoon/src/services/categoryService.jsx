import http from './httpService';
import config from "../config.json"
//note that we can further simply the code with object destructuring
//as ffs import { apiUrl} from "../config.json"
//with object destructuring we replace config.apiUrl with just apiUrl
//note we just imported the entire file

export function getCategories() {
    
   // return http.get("http://localhost:8080/http://localhost:3300/api/categories");
    return http.get(config.apiUrl + "/categories");
  }
 

/*

http://localhost:8080/http://google.com/
 https://peaceful-oasis-80575.herokuapp.com/

 https://peaceful-oasis-80575.herokuapp.com/
  
*/