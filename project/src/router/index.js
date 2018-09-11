import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes.js';
import store from '../store/index.js';
import {LOGIN} from '../store/mutation_types.js';

Vue.use(VueRouter)
const router=new VueRouter({
	routes
})

router.beforeEach((to,from,next)=>{
    if(to.meta.checkLogin){
        if(store.state.userInfo){
            next()
        }else{
            if(window.localStorage.userInfo){
                store.commit(LOGIN,JSON.parse(window.localStorage.userInfo),true);
                next();
            }else{
                next('/login')
            }
        }
    }else{
        next()
    }
})

export default router;