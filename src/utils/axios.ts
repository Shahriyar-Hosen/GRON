import axios from 'axios';
import {API} from './constend';

export const Axios = axios.create({
  baseURL: API,
  timeout: 1000,
  // headers: {Authorization: 'Bearer <TOKEN>'},
});
