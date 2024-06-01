import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'https://www.gron.com.my/wp-json/gron/v1',
  timeout: 1000,
  // headers: {Authorization: 'Bearer <TOKEN>'},
});
