<template>
<div class="row">
    <div class="col-md-4 offset-md-4">
        <div class="d-flex justify-content-center align-items-center">
            <span class="step step1 text-center" style="flex:2">项目信息</span>
            <span class="step step2 text-center active" style="flex:2">人员列表</span>
            <span class="step step3 text-center" style="flex:1">完成</span>
        </div>
        <div class="form-group" v-show="members.length>0">
            <label >参与人列表:</label>
            <ul class="list-group">
                <li style="position:relative" class="list-group-item d-flex justify-content-between align-items-center" :class="{'list-group-item-success':key!=0,'list-group-item-info':key==0}" v-for="(item,key) in members" :key="key">
                    <span>{{item.nickname}}(账号:{{item.username}})</span>
                    <select class="form-control" style="width:auto" @change="jobChange(key)" v-model="jobs[key]" v-if="key==0">
                        <option value="0">创建者</option>
                    </select>
                     <select class="form-control" style="width:auto" @change="jobChange(key)" v-model="jobs[key]" v-else>
                        <option value="1">参与人</option>
                        <option value="2">材料商</option>
                        <option value="3">领导</option>
                    </select>
                    <span style="position:absolute;top:1px;right:3px" class="delete pointer" @click="remove(key)" v-if="key!=0">&times;</span>
                </li>
            </ul>
        </div>
        <div class="d-flex flex-wrap justify-content-between" style="margin-bottom:30px">
            <label style="padding-top:5px">添加参与人:</label>
            <div class="d-flex justify-content-center w-100">
                <input type="text" class="form-control" placeholder="对方手机号/账户" v-model="input">
                <button type="button" class="btn btn-info" style="margin-left:10px" @click="add">添加</button>
            </div>
        </div>
        <div class="d-flex flex-wrap justify-content-between">
            <label>从通讯录中选择:</label>
        </div>
         <div class="d-flex flex-wrap justify-content-center" style="margin-top:10px">
            <button type="button" class="btn btn-info w-50" style="font-size:.5rem" data-toggle="modal" data-target="#select">选择通讯录</button>
        </div>
         <div class="controller">
             <router-link to="/addPro/step1" class="btn btn-outline-primary w-40">上一步</router-link>
             <button type="button" class="btn btn-outline-primary w-40" @click="finish">完成</button>
        </div>
        <div class="d-flex flex-wrap justify-content-center" style="margin-top:10px">
            <small class="text-secondary">选择完成后将发送邀请</small>
        </div>
    </div>
<!-- --------------------------------------- -->
                    <div class="modal fade" id="select">
                        <div class="modal-dialog">
                            <div class="modal-content">
                        
                            <!-- 模态框头部 -->
                            <div class="modal-header">
                                <h4 class="modal-title">联系人列表</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                        
                            <!-- 模态框主体 -->
                            <div class="modal-body">
                               
                                <ul class="list-group">
                                    <li class="list-group-item pointer" data-toggle="collapse" :data-target="key" v-for="(item,key) in book" :key="key" :ref="key"  @click="collapse(key)">
                                        {{item.name}}
                                        <span class="badge badge-pill badge-info" >{{item.member.length}}</span>
                                        <div :id="key" class="collapse">
                                            <ul class="list-group" style="padding-left:30px">
                                                 <label class="form-check-label" v-for="(item2,key2) in item.member" :key="key2">
                                                    <input type="checkbox" class="form-check-input" :value="item2.member" @click.stop="()=>{}" v-model="select">{{item2.nickname}}
                                                </label>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        
                            <!-- 模态框底部 -->
                            <div class="modal-footer">
                                已选择：<span v-for="(item,key) in select_member" :key="key">{{item.nickname}}</span>
                                <button type="button" class="btn btn-success" data-dismiss="modal" @click="push_select">确定</button>
                            </div>
                        
                            </div>
                        </div>
                    </div>
</div>
</template>

<script>
import {get_book,get_userInfo} from '../../../api/book.js';
import {add_pro} from '../../../api/pro.js';
import {UPDATEPRO_MEMBER,LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
export default {
    created(){
        if(this.$store.state.newPro.number=='' || this.$store.state.newPro.name==''){this.$router.push('/addPro/step1')}
        this.init();
    },
    data(){
        return {
           members:[],
           input:'',
           book:[],
           select:[],
           jobs:[0]
        }
    },
    methods:{
        async init(){
            this.members=this.$store.state.newPro.members;
            this.members[0]={...this.$store.state.userInfo,job:0};
            let res=await get_book();
            if(res.data.res!=1){alert(res.data.text);return};
            this.book=res.data.body;
        },
        collapse(r){
            $('#'+r).toggle();
        },
              active(){
            alert('ok')
        },
        async add(){
            if(this.input==''){alert('不能为空');return}
            let res = await get_userInfo({username:this.input});
            if(res.data.res!=1){alert(res.data.text);return;};
            if(this.members.filter(item=>item.id==res.data.body.id).length>0){alert('用户已存在');return;}
            this.members.push({...res.data.body,job:1});
            this.input=''
        },
        jobChange(key){
            this.members[key]['job']=this.jobs[key];
        },
        push_select(){
            let arr=this.select_member.filter(item=>this.members.map(item=>item.id).indexOf(item.id)<0)
            arr.forEach(item=>{
                this.members.push(item)
            })
        },
        remove(key){
            this.members=this.members.filter((item,key1)=>key1!=key);
        },
        async finish(){
            let data={
                ...this.$store.state.newPro,members:this.members.map(item=>{
                    return {id:item.id,job:item.job}
                })
            }
            this.$store.commit(LOADING_START)
            let res=await add_pro(data);
            this.$store.commit(LOADING_END)
            if(res.data.res!=1){alert(res.data.text);return;}
            alert('工程创建成功，即将跳转到工程管理页面');
            this.$router.push('/pro/'+res.data.body+'/set')
        }
    },
    computed:{
        book_member(){
            return this.book.map(item=>item.member);
        },
        select_member(){
            let arr=[];
            this.select.forEach(item=>{
                this.book_member.forEach(item2=>{
                    item2.forEach(item3=>{
                        if(item3.member==item){
                            item3.id=item3.member;
                            item3.job=1;
                            arr.push(item3)
                        }
                    })
                })
            })
            return arr;
        }
    },
    watch:{
        members:{
            handler(newval,oldval){
               this.$store.commit(UPDATEPRO_MEMBER,newval);
               this.jobs=newval.map(item=>item.job)
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
    min-height:300px;

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
