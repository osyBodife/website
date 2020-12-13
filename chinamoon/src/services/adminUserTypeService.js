import http from './httpService';
import config from "../config.json"
//note that we can further simply the code with object destructuring
//as ffs import { apiUrl} from "../config.json"
//with object destructuring we replace config.apiUrl with just apiUrl
//note we just imported the entire file

export function getAdminUserTypes() {
    
   //return http.get("http://localhost:8080/http://localhost:3300/api/adminusertypes");
    return http.get(config.apiUrl + "/adminusertypes");
    
  }

