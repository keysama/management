<template>
<div class="row">
    <div class="col-md-4 offset-md-4 box">
        <h5 class="text-center">登陆</h5>
        <div class="form-group">
            <label for="email">账户:</label>
            <input type="email" class="form-control" placeholder="请输入账户/手机号" v-model="username">
        </div>
         <div class="form-group">
            <label for="pwd">密码:</label>
            <input type="password" class="form-control" placeholder="请输入密码" v-model="password">
         </div>
        <div class="form-check">
            <label class="form-check-label">
                <input class="form-check-input" type="checkbox" v-model=remember> 记住密码
            </label>
        </div>
        <div class="form-group">
            <span class="btn btn-primary" @click="go">登陆</span>
        </div>
    </div>
</div>
</template>

<script>
import {login} from '../../api/account.js';
import {LOGIN} from '../../store/mutation_types.js';
export default {
   data(){
       return {
           username:'',
           password:'',
           remember:true
       }
   },
   methods:{
       async go(){
        if(this.username!='' && this.password!=''){
            let res=await login({
                username:this.username,
                password:this.password
            });
            if(res.data.res==1){
                this.$store.commit(LOGIN,{...res.data.userInfo,remember:this.remember});
                this.$router.push('/home')
            }else{
                alert(res.data.text)
            }
        }
       }
   }
}
</script>
<style lang="less" scoped>
@import "../../assets/css/theme.less";
.row{
    height:100%;
    padding-top:50px;
}
.box{
    box-shadow: 0 5px 20px #bdbdbd;
    padding:40px;
    width:80%;
    background-color: #FFF;
    height: fit-content;
    border-radius: 15px;
    margin: 0 auto;
    .btn{
        width:50%;
        display: block;
        margin: 0 auto;
    }
}
</style>
