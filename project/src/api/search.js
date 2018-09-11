import axios from './index.js';

export const getGlobal = (data)=>{
	return axios.post('api/search/global',data)
};

