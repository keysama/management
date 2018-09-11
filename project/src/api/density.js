import axios from './index.js';

export const list_density = (data)=>{
	return axios.post('api/density/list',data)
};

export const add_density = (data)=>{
	return axios.post('api/density/add',data)
};

export const delete_density = (data)=>{
	return axios.post('api/density/delete',data)
};

export const find_density = (data)=>{
	return axios.post('api/density/find',data)
};