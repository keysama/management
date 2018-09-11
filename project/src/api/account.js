import axios from './index.js';

export const chackName = (data)=>{
	return axios.post('api/account/checkusername',data)
};

export const registe = (data)=>{
	return axios.post('api/account/registe',data)
};

export const phoneVerify = (data)=>{
	return axios.post('api/verify/send',data)
};

export const checkVerify = (data)=>{
	return axios.post('api/verify/check',data)
};

export const login = (data)=>{
	return axios.post('api/account/login',data)
};

export const logout = ()=>{
	return axios.post('api/account/logout')
};

export const checkLog = (id)=>{
	return axios.post('api/account/check',{id:id})
};

export const saveChange = (data)=>{
	return axios.post('api/account/saveChange',data)
};

export const changePass = (data)=>{
	return axios.post('api/account/changePass',data)
};