import axios from './index.js';

export const create_daily = (data)=>{
	return axios.post('api/daily/create',data)
};

export const get_dailyList = (data)=>{
	return axios.post('api/daily/list',data)
};

export const delete_daily = (data)=>{
	return axios.post('api/daily/delete',data)
};

export const add_comment = (data)=>{
	return axios.post('api/daily/addComment',data)
};

export const get_commentList = (data)=>{
	return axios.post('api/daily/commentList',data)
};