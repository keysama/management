import axios from './index.js';

export const add_pro = (data)=>{
	return axios.post('api/pro/add',data)
};

export const edit_pro = (data)=>{
	return axios.post('api/pro/edit',data)
};

export const delete_pro = (data)=>{
	return axios.post('api/pro/delete',data)
};

export const get_message = ()=>{
    return axios.post('api/pro/message')
}

export const pro_count = ()=>{
	return axios.post('api/pro/count')
};

export const show_pro = ()=>{
	return axios.post('api/pro/all')
};

export const checkPower=(data)=>{
	return axios.post('api/pro/checkPower',data)
}

export const proInfo = (id)=>{
	return axios.post('api/pro/info',{id:id})
};

export const details = (data)=>{
	return axios.post('api/pro/details',data)
};

export const proMembers = (id)=>{
	return axios.post('api/pro/members',{id:id})
};

export const proMembers_edit = (data,id)=>{
	return axios.post('api/pro/membersEdit',{members:data,id:id})
};