import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import {jobList} from '../config/power.js';
Vue.use(Vuex)

const state = {
	loading:false,
	userInfo:'',
	newPro:{
		name:'',
		number:'',
		address:'',
		yezhu:'',
		design:'',
		danwei:'',
		mdanwei:'',
		introduce:'',
		members:[]
	},
	newOrder:{
		type:0,
	},
	jobList
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})