import axios from './index.js';

export const pro_invite = ()=>{
    return axios.post('api/communion/proInvite')
}

export const pro_invite_agree = (id)=>{
    return axios.post('api/communion/proInviteAgree',{id:id})
}

export const pro_invite_disagree = (id)=>{
    return axios.post('api/communion/proInviteDisagree',{id:id})
}