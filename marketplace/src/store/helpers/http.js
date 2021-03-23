import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    'content-type': 'application/json',
    Authorization: ''
  }
})

http.interceptors.request.use(
  function(config) {
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

export default http
