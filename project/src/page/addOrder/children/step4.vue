<template>
<div class="col-md-12"  style="background-color:#fff;padding-bottom:20px">
        <div class="col-md-4 offset-md-4 box" style="margin-top:20px">
            <div class="d-flex justify-content-center align-items-center">
            <span class="step step1 text-center" style="flex:1">类别</span>
            <span class="step step2 text-center " style="flex:2">订单信息</span>
            <span class="step step3 text-center active" style="flex:2">提料单</span>
            </div>
            <div class="d-flex align-items-center justify-content-center" style="background-color:#16a3b9;width:100px;height:100px;border-radius:50%;font-size:20px;color:#fff;margin:50px auto">
                &ensp;√<br/>
                完成
            </div>
            <div class="d-flex align-items-center justify-content-center" >
              {{time}}秒后跳转到订单列表,<router-link :to="'/pro/'+$route.params['id']+'/order'">点击跳转</router-link>
            </div>
            <div class="controller">
                <router-link to="step2" class="btn btn-outline-primary disabled">上一步</router-link>
                <router-link :to="'/pro/'+$route.params['id']+'/order'" class="btn btn-outline-primary">完成</router-link>
            </div>
        </div> 
</div>
</template>

<script>
export default{
    created(){
        this.init();
    },
    data(){
        return {
            time:5,
            ck:''
        }
    },
    methods:{
        init(){
            this.ck=setInterval(()=>{
                this.time-=1;
                if(this.time<1){
                    clearInterval(this.ck)
                    this.$router.push('/pro/'+this.$route.params.id)
                }
            },1000)
        }
    },
    destroyed(){
        clearInterval(this.ck)
    }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/theme.less";
.controller{
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .btn:nth-child(1){
        width: 30%
    }
    .btn:nth-child(2){
        width: 68%
    }
}
.step{
    background-color: #9d9d9d;
    color:#fff;
    position: relative;
    margin-right: 10px;
    padding:3px 0;
}
.active{
    background-color: @cut1;
}
.active::after{
    border-left: 10px solid @cut1 !important;
}
.step1::after{
    content: '';
    width:0; 
    height:0; 
    position: absolute;
    right:-10px;
    top:calc(50% - 10px);
    border-top:10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #9d9d9d;
}
.step2::after{
    content: '';
    width:0; 
    height:0; 
    position: absolute;
    right:-10px;
    top:calc(50% - 10px);
    border-top:10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #9d9d9d;
}
.step2::before{
    content: '';
    width:0; 
    height:0; 
    position: absolute;
    left:0;
    top:calc(50% - 10px);
    border-top:10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #fff;
}
.step3::before{
    content: '';
    width:0; 
    height:0; 
    position: absolute;
    left:0;
    top:calc(50% - 10px);
    border-top:10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid #fff;
}
</style>