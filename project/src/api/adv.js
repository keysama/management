import axios from './index.js';

export const get = ()=>{
	return axios.post('api/adv/get')
};
