import http from './httpService';
//const axios = require('axios');

const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "http://localhost:3300/api/categories";
export function getCategories() {
    return http.get(proxyurl + url);
  }
  

/*
  const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "https://example.com"; // site that doesn’t send Access-Control-*
fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
.then(response => response.text())
.then(contents => console.log(contents))
.catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

*/