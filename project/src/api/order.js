import axios from './index.js';

export const add_order = (data)=>{
	return axios.post('api/order/add',data)
};

export const edit_order = (data)=>{
	return axios.post('api/order/edit',data)
};

export const delete_order = (data)=>{
	return axios.post('api/order/delete',data)
};

export const getOrderInfo = (data)=>{
	return axios.post('api/order/get?order='+data.order)
};

export const getOrderList = (data)=>{
	return axios.get('api/order/list?pro='+data)
};

export const getSheetInfo = (data)=>{
	return axios.post('api/sheet/info?order='+data)
};

export const delete_sheet = (data)=>{
	return axios.post('api/sheet/delete',data)
};

export const edit_sheet_api = (data)=>{
	return axios.post('api/sheet/edit',data)
};

export const add_sheet = (data)=>{
	return axios.post('api/sheet/add',data)
};

export const add_file = (data)=>{
	return axios.post('api/order/addFile',data)
};

export const getWorkers = (data)=>{
	return axios.post('api/order/getWorkers',data)
};

export const examine = (data)=>{
	return axios.post('api/order/examine',data)
};

export const examine_back = (data)=>{
	return axios.post('api/order/examineBack',data)
};

export const sendAllow = (data)=>{
	return axios.post('api/order/sendAllow',data)
};

export const sendBack = (data)=>{
	return axios.post('api/order/sendBack',data)
};