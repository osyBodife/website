import axios from "axios";
//import {getJwt} from './authService'
//import * as Sentry from "@sentry/browser";

import log from "./logService";
import { toast } from "react-toastify";
//note that this file does not see getJwt when accessed from auth object
//import auth from "./authService";
// but works when getJwt is imported directly
//axios.defaults.headers.common['x-auth-token'] = auth.getJwt();
//axios.defaults.headers.common["x-auth-token"] = getJwt();

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    log.log(error);
    //Sentry.captureException(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
