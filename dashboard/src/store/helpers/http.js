import axios from 'axios';

const http = axios.create({
  headers: {
    'content-type': 'application/json',
    Authorization: '',
  },
});

http.interceptors.request.use(
  function(config) {
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default http;
