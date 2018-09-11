<template>
<div class="col-md-12" style="background-color:#fff;padding-bottom:20px">
        <div class="col-md-4 offset-md-4 box" style="margin-top:20px">
        <div class="d-flex justify-content-center align-items-center">
            <span class="step step1 text-center active" style="flex:1">类别</span>
            <span class="step step2 text-center " style="flex:2">订单信息</span>
            <span class="step step3 text-center " style="flex:2">提料单</span>
        </div>
        <div class="form-group d-flex flex-column selects" style="margin-top:20px">
            <label class="mulit" >请选择订单的种类:</label>
            <button class="btn" :class="{'btn-primary':select==0}" @click="select=0">铝型材</button>
            <button class="btn" :class="{'btn-primary':select==1}" @click="select=1">钢型材</button>
            <button class="btn" :class="{'btn-primary':select==2}" @click="select=2">板材</button>
            <button class="btn" :class="{'btn-primary':select==3}" @click="select=3">钢加工件</button>
            <button class="btn" :class="{'btn-primary':select==4}" @click="select=4">辅助材料</button>
        </div>
         <div class="controller">
             <router-link to="/addPro/step1" class="btn btn-outline-primary disabled">上一步</router-link>
             <router-link to="step2" class="btn btn-outline-primary">下一步</router-link>
        </div>
    </div>
</div>
</template>

<script>
import {UPDATEORDER} from '../../../store/mutation_types'
export default {
    created(){
        this.init();
    },
    data(){
        return {
            select:0
        }
    },
    methods:{
        init(){
            this.select=this.$store.state.newOrder.type;
        }
    },
    watch:{
        select(newval,oldval){
            this.$store.commit(UPDATEORDER,{type:newval})
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/theme.less";
.selects{
    .btn{
        margin-top:10px
    }
}
.controller{
    margin-top: 50px;
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