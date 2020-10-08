import http from "./httpService";
import jwtDecode from "jwt-decode";

//import config from "../config.json";
const apiEndpoint = "/auth";
const tokenKey = "token";

// when a user submits a login form
// we use axios post, url and object created by login credentials to
// to send data to DB
//for authentication purposes, we store data into the localStorage
export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

//we create a function that takes a variable ie jwt and stores it localStorage
// using key : value pairs
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getCurrentUser() {
  try {
    //get the value of localstorage
    const jwt = localStorage.getItem(tokenKey);
    // we get the user object by passing jwt
    //as an argument in jwtDecode method
    return jwtDecode(jwt);
    //jwt is decoded, the contains the user object
  } catch (ex) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem(tokenKey);
}
//for importing getJwt() directly
// export function getJwt() {
//   return localStorage.getItem('token');
// }

http.setJwt(getJwt());

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

//export default objects
//in the object are our functions
export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
