import http from "./httpService";
import { apiUrl } from "../config.json";


//const proxyServerUrl = "http://localhost:8080/";
//const apiEndPoint = "http://localhost:3300/api/";

//const apiEndPoint = apiUrl + "/register";
const apiEndPoint = apiUrl + "/adminusers";



export function getAdminUsers() {
  //return http.get("http://localhost:8080/" + apiEndPoint);
  return http.get(apiEndPoint);
}
// create a function to be used here alone, no need to export
function targetUrl(id){
// return apiEndPoint + "/" + id;
//using template leterals
 return `${apiEndPoint}/${id}`;
}
export function deleteAdminUser(adminUserId) {
  //return http.delete(urlCombo + "/" + adminUserId);
  //return http.delete(apiEndPoint + "/" + adminUserId);
  return http.delete(targetUrl(adminUserId))
}

export function getAdminUser(adminUserId) {
  //return http.get(apiEndPoint + "/" + adminUserId);
  return http.get(targetUrl(adminUserId));
}

export function saveAdminUser(adminUser) {
   if (adminUser._id) {
     
    //clone the menu passed as an argument
    const adminUserBody = { ...adminUser };
    //remove id from menuBody, this is necessary
    //to avoid confusion with the id in url
    delete adminUserBody._id;
    //to update data from db, we need the route and the req.body=data
    //ie req.body less unwanted data

    //return http.put(apiEndPoint + "/" + adminUser._id, adminUserBody);
     return http.put(targetUrl(adminUser._id), adminUserBody);
  } 
    //it is new menu, so we post
    return http.post(apiEndPoint, adminUser);
    

}
