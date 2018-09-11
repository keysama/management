<template>
<div class="row">
    <div class="col-md-4 offset-md-4 box">
        <div class="d-flex justify-content-center align-items-center">
            <span class="step step1 text-center active" style="flex:2">项目信息</span>
            <span class="step step2 text-center" style="flex:2">人员列表</span>
            <span class="step step3 text-center" style="flex:1">完成</span>
        </div>
        <div class="form-group">
            <label class="mulit" >工程名称:</label>
            <input type="text" class="form-control" v-model.lazy="project.name">
        </div>
        <div class="form-group">
            <label class="mulit">工程代号:</label>
            <input type="text" class="form-control" v-model="project.number">
        </div>
        <div class="form-group">
            <label >详细信息:</label>
            <div class="text-center">
                <span class="btn btn-info" style="font-size:.5rem" data-toggle="modal" data-target="#more">点击添加详细信息</span>
            </div>
        </div>
         <div class="controller">
             <router-link to="/addPro/step1" class="btn btn-outline-primary disabled">上一步</router-link>
             <router-link to="/addPro/step2" class="btn btn-outline-primary" :class="{'disabled':!cannext}">下一步</router-link>
        </div>
    </div>
<!-- ----------------------------------- -->
<div class="modal fade" id="more">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">详细信息</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
        <div class="form-group">
            <label >项目地址:</label>
            <input type="text" class="form-control" v-model.lazy="project.address">
        </div>
        <div class="form-group">
            <label >建设单位:</label>
            <input type="text" class="form-control" v-model.lazy="project.yezhu">
        </div>
        <div class="form-group">
            <label >建筑设计单位:</label>
            <input type="text" class="form-control" v-model.lazy="project.design" >
        </div>
        <div class="form-group">
            <label >总包单位:</label>
            <input type="text" class="form-control" v-model.lazy="project.danwei">
        </div>
        <div class="form-group">
            <label>幕墙设计单位:</label>
            <input type="text" class="form-control" v-model.lazy="project.mdanwei">
        </div>
        <div class="form-group">
            <label >  简介:</label>
            <textarea class="form-control" rows="5" style="resize:none" v-model.lazy="project.introduce"></textarea>
        </div>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal">确定</button>
      </div>
 
    </div>
  </div>
</div>
</div>
</template>

<script>
import {UPDATEPRO} from '../../../store/mutation_types.js';
export default {
    created(){
        this.init();
    },
    data(){
        return {
            project:{
                name:'',
                number:'',
                address:'',
                yezhu:'',
                design:'',
                danwei:'',
                mdanwei:'',
                introduce:''
            },
        }
    },
    methods:{
        init(){
            this.project=this.$store.state.newPro;
        }
    },
    computed:{
        cannext(){
            return this.project.name!='' && this.project.number!=''
        }
    },
    watch:{
        project:{
            handler(newval,oldval){
               this.$store.commit(UPDATEPRO,newval)
            },
            immediate:false,
            deep:true
        }
    }
}
</script>
<style lang="less" scoped>
@import "../../../assets/css/theme.less";
.row{
    padding:10px;
    .box{
        min-height:438px;
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
.title{
    font-size: 1rem;
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
