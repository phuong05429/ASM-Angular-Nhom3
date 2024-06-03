import {APP_CONFIG} from "./app.config";
import {IAPIEndpoint} from "../interfaces";

export const API_BASE_URL = APP_CONFIG.apiBaseUrl;

export const API_ENDPOINT: IAPIEndpoint = {
  auth: {
    base: API_BASE_URL + '/' + 'auth',
    login: '/auth/login',
    logout: '/auth/logout',
  },
  hotels:{
    base:API_BASE_URL + '/hotels',
    add:API_BASE_URL + '/hotel',
    edit:API_BASE_URL + '/hotel',
    delete:API_BASE_URL + '/hotel',
  },
  rooms:{
    base:API_BASE_URL + '/rooms',
    add:API_BASE_URL + '/rooms',
    edit:API_BASE_URL + '/rooms',
    delete:API_BASE_URL + '/rooms',
  },
  checkin:{
    base:API_BASE_URL + '/check-in',
    add:API_BASE_URL + '/check-in',
    edit:API_BASE_URL + '/check-in',
    delete:API_BASE_URL + '/check-in',
  }
};