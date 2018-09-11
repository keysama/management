<template>
<nav class="navbar navbar-expand-md fixed-top" v-if="$store.state.userInfo">
  <!-- Brand -->
  <router-link to="/home" class="navbar-brand">幕墙提料管理</router-link>
            <!-- Toggler/collapsibe Button -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
            <i class="iconfont icon-liebiao"></i>
        </button>
        
        <!-- Navbar links -->
        <div class="collapse navbar-collapse navbar-right" id="collapsibleNavbar">
            <ul class="navbar-nav navbar-right">
            <li style="min-width:210px">
                <div class="hidden-xs ddflex justify-content-center align-items-center h-100">
                    <div class="w-100 h-75 d-flex justify-content-between align-items-center" style="background-color:#fff;border-radius:5px;overflow:hidden;position:relative">
                    <input class="w-100 h-100" type="text" placeholder="搜索" style="display:block;font-size:14px;border:none;padding:0 30% 0 10px" v-model="input_text">
                    <span class="btn btn-light text-muted h-100 w-25 text-center" style="font-size:12px;position:absolute;right:0;top:0" @click="search">搜索</span>
                    </div>
                </div> 
            </li>
            <li class="nav-item ">
                <a class="nav-link text-light pointer-default"><i class="iconfont icon-user"></i>{{$store.state.userInfo.nickname}}</a>
                <div class="hidden-md ddflex justify-content-center">
                    <input class="form-control w-50" type="text" placeholder="搜索" v-model="input_text">
                    <span class="btn btn-light text-muted" @click="search">搜索</span>
                </div> 
            </li>
            <li class="nav-item">
                <router-link to="/user/index" class="nav-link btn ">个人中心</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/user/book" class="nav-link btn ">通讯录</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/user/set" class="nav-link btn">设置</router-link>
            </li>
            <li class="nav-item">
                <span class="nav-link text-dark btn" @click="logout"><small class="text-muted">退出登录</small></span>
            </li>
            </ul>
        </div> 
</nav>
<nav class="navbar navbar-expand-md fixed-top flex-center" v-else>
  <!-- Brand -->
  <router-link to="/home" class="navbar-brand">幕墙提料管理</router-link>
            <!-- Toggler/collapsibe Button -->
   <ul class="navbar-nav flex-row">
    <li class="nav-item">
      <router-link to="/login" class="nav-link btn">登陆</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/registe" class="nav-link btn">注册</router-link>
    </li>
  </ul>
        
</nav>
</template>

<script>
import {LOGOUT} from '../../store/mutation_types.js';
export default {
    created(){
    },
    data(){
        return {input_text:''}
    },
    methods:{
        logout(){
            this.$store.commit(LOGOUT)
        },
        search(){
            if(this.$route.path.indexOf('/result')>=0){
                this.$router.push('/result/'+this.input_text)
                window.location.reload();
            }else{
                this.$router.push('/result/'+this.input_text)
            }
        }
    }

}
</script>
<style lang="less" scoped>
@import "../../assets/css/theme.less";
.ddflex{
    display: flex;
}
.navbar-right{
    justify-content: flex-end;
 
}
.navbar{
    background-color: @cut2;
    .navbar-brand{
        color: #fff;
    }
    .navbar-toggler{
        background-color: spin(@cut4,10);
        color: #fff;
    }
    .nav-item{
        margin:0 5px;
        .btn{
            background-color:none;
            color:#fff;

        }
    }
}
a.router-link-active{
		color:#acacac !important;
}

</style>
