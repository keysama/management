import axios from './index.js';

export const getTimeLine = (data)=>{
	return axios.post('api/timeline/list',data)
};

