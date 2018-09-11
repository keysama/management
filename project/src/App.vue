<template>
<div class="h-100">
    <div class="container-fluid h-100">
        <topNav />
        <div class="body-content">
        <router-view></router-view>
        </div>
    </div>
    <loading v-show="$store.state.loading"></loading>
</div>
</template>

<script>
import {checkLog} from './api/account.js';
import {LOGIN,LOGOUT} from './store/mutation_types.js';
import loading from './components/common/loading.vue';
import topNav from './components/common/topNav.vue';
export default {
    created(){
        if(window.localStorage.userInfo){
            this.log();
        }
    },
    methods:{
        async log(){
            let res=await checkLog(JSON.parse(window.localStorage.userInfo).id);
            if(res.data.res!=1){
                this.$store.commit(LOGOUT);
            }else{
                this.$store.commit(LOGIN,JSON.parse(window.localStorage.userInfo),true);
            }
        },
    },
    components:{
        topNav,loading
    },
}
</script>

<style lang="less">
@import "./assets/css/theme.less";
html{
    height:100%;
}
body{
    height:100%;
    background-color: #ececec !important;
}
#app{
    height:100%;
}
.container-fluid{
    padding:0 !important;
    margin: 0 !important;
    background-color: #ececec !important;
    padding-bottom: 10px !important;
}
.body-content{
    height: 100% !important;
    width: 100% !important;
    overflow-x: hidden !important;
}
@media screen and (min-width:768px){
    .body-content{
        padding:58px 0 0 0 !important;
    }
    .hidden-md{
        display: none !important;
    }

}
@media screen and (max-width:768px){
    .body-content{
        padding:55px 0px 2px 0px !important;
    }
    .hidden-xs{
        display: none !important;
    }
}
</style>
