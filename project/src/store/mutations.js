import {
    LOGIN,
    LOGOUT,
    UPDATEPRO,
    UPDATEORDER,
    UPDATEPRO_MEMBER,
    LOADING_START,
    LOADING_END
} from './mutation_types.js'

import {setStore, getStore} from '../config/mUtils.js'
import {logout} from '../api/account.js';
export default {
    // //获取所有分类
	[LOGIN](state,data){
        //存到state
        state.userInfo=data;
        if(data.remember){
            //存到缓存
            setStore('userInfo',data);
        }
    },
    [LOGOUT](state){
        state.userInfo=null;
        logout().then();
        window.localStorage.removeItem('userInfo')
    },
    [UPDATEPRO](state,data){
        state.newPro=data;
    },
    [UPDATEPRO_MEMBER](state,data){
        state.newPro.members=data;
    },
    [LOADING_START](state){
        state.loading=true;
    },
    [LOADING_END](state){
        state.loading=false;
    },
    [UPDATEORDER](state,data){
      for(var key in data){
        state.newOrder[key]=data[key];
      }
    }
}