import Axios from 'axios'

Axios.defaults.baseURL = 'http://103.74.255.224:8080'

const UNPROTECTED_PATHS = [
    "login",
  ]

const isUnprotectedPath = (url) => {
    for (let path of UNPROTECTED_PATHS) {
      if (url.includes(path)) {
        return true
      }
    }
    return false
  }
  
  Axios.interceptors.request.use(
    async config => {
      console.log(config)
  
      if (isUnprotectedPath(config.url)) {
        return config
      }
  
      let token = localStorage.getItem("Access_TOKEN");
      config.headers["Authorization"] = `Bearer ${token}`;
      return config;
    },
    async error => {
      throw error;
    },
  );
  

export default Axios