import axios from './index.js';

export const getTotal = (data)=>{
	return axios.post('api/collect/total',data)
};

export const setYuji = (data)=>{
	return axios.post('api/collect/save',data)
};