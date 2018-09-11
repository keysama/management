<template>
<div class="row">
    <div class="col-md-4 offset-md-4 box">
        <h5 class="text-center">注册</h5>
        <div class="form-group">
            <label for="nickname">账户:</label>
            <input type="text" class="form-control" placeholder="请输入您的账户" v-model.lazy="username">
        </div>
        <div class="form-group">
            <label for="departments">昵称:</label>
            <input type="text" class="form-control"  placeholder="请输入您的昵称" v-model="nickname">
        </div>
        <div class="form-group">
            <label for="phone">手机号:</label>
            <input type="tel" class="form-control" :class="{danger:!phone_pass}" placeholder="请输入您的手机号" v-model="phone">
        </div>
        <div class="form-group d-flex justify-content-start">
            <input type="tel" class="form-control w-65" placeholder="手机验证码" v-model.lazy="verify">
            <span class="btn btn-primary w-30" :class="{disabled:sent}" @click="getVerify" ref="verify" style="margin:2px">获取验证码</span>
        </div>
         <div class="form-group">
            <label for="password">密码:</label>
            <input type="password" class="form-control" placeholder="请输入密码" v-model="password">
        </div>
         <div class="form-group">
            <label for="password2">确认密码:</label>
            <input type="password" class="form-control" :class="{danger:!password_pass}" placeholder="确认密码" v-model="password2">
         </div>
        <div class="form-group d-flex justify-content-center">
            <span class="btn btn-primary w-50" @click="go" ref="registe">注册</span>
        </div>
    </div>
</div>
</template>

<script>
import {registe,phoneVerify,checkVerify} from '../../api/account.js';
export default {
   data(){
       return {
           nickname:'',
           username:'',
           phone:'',
           password:'',
           verify:'',
           password2:'',
           sent:false
       }
   },
   computed:{
       phone_pass(){
           return /^[0-9]{11}$/.test(this.phone) || this.phone==''
       },
       password_pass(){
           return this.password2==this.password || this.password2=='';
       }
   },
   methods:{
       async getVerify(){
           if(this.phone_pass && this.phone!='' && !this.sent){
              let res=await phoneVerify({phone:this.phone});
              if(res.data.res==1){
                  this.sent=true;
                  this.clock();
              }
           }
       },
       clock(){
           let time=60;
           let ck=setInterval(()=>{
                time-=1;
                this.$refs.verify.innerText='发送成功'+time;
                if(time==1){
                    clearInterval(ck);
                    this.sent=false;
                    this.$refs.verify.innerText='发送验证码';
                }
           },1000)
       },
       async go(){
           if(this.nickname!='' && this.username!='' && this.phone!='' && this.password!='' && this.password2!='' && this.verify!=''){
               this.$refs.registe.innerText="注册中...";
                let res= await registe({
                    username:this.username,
                    nickname:this.nickname,
                    phone:this.phone,
                    password:this.password,
                    verify:this.verify,
                    password2:this.password2
                });
                if(res.data.res==1){
                    this.$refs.registe.innerText="注册";
                    alert('注册成功，去登陆')
                    this.$router.push('/login')
                    
                }else{
                    this.$refs.registe.innerText="注册";
                    alert(res.data.text)
                }
           }
       }
   }
}
</script>

<style lang="less" scoped>
@import "../../assets/css/theme.less";
.danger{
    border:1px solid red;
}
.disabled{
    background-color: #fff !important;
    color:#000 !important;
    border:1px solid #000 !important;
}
.box{
    background-color: #fff;
    padding-top:18px;
}
.row{
    padding:0 18px;
}
</style>