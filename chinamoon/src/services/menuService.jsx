import http from "./httpService";
import { apiUrl } from "../config.json";
//import { getCategories } from "../services/categoryService";

//const proxyServerUrl = "http://localhost:8080/";
//const apiEndPoint = "http://localhost:3300/api/menus";
const apiEndPoint = apiUrl + "/menus";
//const urlCombo = "http://localhost:8080/http://localhost:3300/api/menus";

export function getMenus() {
  //return http.get("http://localhost:8080/" + apiEndPoint);
  return http.get(apiEndPoint);
}

export function deleteMenu(menuId) {
  //return http.delete(urlCombo + "/" + menuId);
  return http.delete(apiEndPoint + "/" + menuId);
}

export function getMenu(menuId) {
  return http.get(apiEndPoint + "/" + menuId);
}

export function saveMenu(menu) {
  if (menu._id) {
    //clone the menu passed as an argument
    const menuBody = { ...menu };
    //remove id from menuBody, this is necessary
    //to avoid confusion with the id in url
    delete menuBody._id;
    //to update data from db, we need the route and the req.body=data
    //ie req.body less unwanted data
    return http.put(apiEndPoint + "/" + menu._id, menuBody);
  } 
    //it is new menu, so we post
    return http.post(apiEndPoint, menu);

}
