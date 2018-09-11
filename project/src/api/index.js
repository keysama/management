import axios from 'axios';
import {baseUrl} from '../config/env.js';
axios.defaults.baseURL=baseUrl;
axios.defaults.withCredentials =false;
if (process.env.NODE_ENV == 'development') {
    axios.defaults.withCredentials = true;
  
  }else if(process.env.NODE_ENV == 'production'){
    axios.defaults.withCredentials = false;
}

export default axios;



