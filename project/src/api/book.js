import axios from './index.js';

export const add_book = (data)=>{
	return axios.post('api/book/add',data)
};

export const get_book = ()=>{
	return axios.post('api/book/get')
};

export const add_member = (data)=>{
	return axios.post('api/book/memberAdd',data)
};

export const get_userInfo = (data)=>{
	return axios.post('api/book/userInfo',data)
};