<template>
  <div class="row align-content-start">
      <div class="col-md-12 title">
          <h4><i class="iconfont icon-shezhi" style="font-size:1.5rem">工程设置</i></h4>
      </div>
      <div class="col-md-12">
        <ul class="list-group">
          <li class="list-group-item pointer" data-toggle="modal" data-target="#message">信息修改</li>
          <li class="list-group-item pointer" data-toggle="modal" data-target="#manage">人员管理</li>
          <li class="list-group-item pointer bg-danger text-white" @click="delete_pro">删除工程</li>
        </ul>
      </div>
      <!-- ------------------- -->
      <div class="modal fade" id="message">
        <div class="modal-dialog">
          <div class="modal-content">
      
            <!-- 模态框头部 -->
            <div class="modal-header">
              <h4 class="modal-title">信息修改</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
      
            <!-- 模态框主体 -->
            <div class="modal-body">
              <div class="form-group">
                  <label >项目名称:</label>
                  <input type="text" class="form-control" disabled v-model.lazy="project.name">
              </div>
              <div class="form-group">
                  <label >项目代号:</label>
                  <input type="text" class="form-control" disabled v-model.lazy="project.number">
              </div>
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
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="infoEdit">确定</button>
            </div>
      
          </div>
        </div>
      </div>
      <!-- ------------------- -->
      <div class="modal fade" id="manage">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
      
            <!-- 模态框头部 -->
            <div class="modal-header">
              <h4 class="modal-title">人员管理</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>
      
            <!-- 模态框主体 -->
            <div class="modal-body">
              <div class="row">
                 <div class="col-md-6">
                    <div class="form-group" v-show="members.length>0">
                      <label >参与人列表:</label>
                      <ul class="list-group">
                          <li style="position:relative" class="list-group-item d-flex justify-content-between align-items-center" :class="{'list-group-item-success':key!=0&&item.state!=0,'list-group-item-info':key==0,'list-group-item-secondary':item.state==0}" v-for="(item,key) in members" :key="key">
                              <span>{{item.nickname}}(账号:{{item.username}})</span><span class="badge badge-pill badge-default">{{item.state==1?'已加入':'等待同意'}}</span>
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
                </div>
                <div class="col-md-6">
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
                </div>
              </div>
            </div>
      
            <!-- 模态框底部 -->
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-dismiss="modal" @click="memberEdit">确定修改</button>
            </div>
      
          </div>
        </div>
      </div>

      <!-- ----------------------------- -->

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
                                    <li class="list-group-item pointer" v-for="(item,key) in book" :key="key" :ref="key"  @click="collapse(key)">
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
import {checkPower,proInfo,proMembers,proMembers_edit,edit_pro,delete_pro} from '../../../api/pro.js';
import {get_book,get_userInfo} from '../../../api/book.js';
import {LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
export default{
  created(){
    this.id=this.$route.params.id;
    this.init();
  },
  data(){
    return{
      id:'',
      power:0,
      project:{},
      members:[],
      book:[],
      select:[],
      input:'',
      jobs:[0]
    }
  },
  methods:{
    async init(){
          this.$store.commit(LOADING_START)
          let res=await checkPower({id:this.id})
          let res2=await proInfo(this.id)
          let res3=await proMembers(this.id)
          let res4=await get_book();
          if(res.data.res!=1){this.$store.commit(LOADING_END);alert(res.data.text);this.$router.push('/home');return};
          if(res2.data.res!=1){this.$store.commit(LOADING_END);alert(res2.data.text);this.$router.push('/home');return};
          if(res3.data.res!=1){this.$store.commit(LOADING_END);alert(res3.data.text);this.$router.push('/home');return};
          if(res4.data.res!=1){alert(res4.data.text);return};
          this.project=res2.data.body;
          this.power=res.data.body;
          let member_holder=res3.data.body.filter(item=>item.job==0)
          this.members=res3.data.body.filter(item=>item.job!=0)
          this.members.unshift(member_holder[0])
          this.book=res4.data.body;
          this.$store.commit(LOADING_END)
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
      collapse(r){
          $('#'+r).toggle();
      },
      async add(){
            if(this.input==''){alert('不能为空');return}
            let res = await get_userInfo({username:this.input});
            if(res.data.res!=1){alert(res.data.text);return;};
            if(this.members.filter(item=>item.id==res.data.body.id).length>0){alert('用户已存在');return;}
            this.members.push({...res.data.body,job:1,state:0});
            this.input=''
        },
      async memberEdit(){
        this.$store.commit(LOADING_START);
        let res=await proMembers_edit(this.members,this.id);
        if(res.data.res!=1){this.$store.commit(LOADING_END);alert(res.data.text);return};
        this.$store.commit(LOADING_END);
        alert('修改成功')
      },
      async infoEdit(){
        this.$store.commit(LOADING_START);
        let res=await edit_pro(this.project);
        if(res.data.res!=1){this.$store.commit(LOADING_END);alert(res.data.text);return};
        this.$store.commit(LOADING_END);
        alert('修改成功')
      },
      async delete_pro(){
          if(!confirm('删除工程？')){return ;}
          this.$store.commit(LOADING_START);
          let res=await delete_pro({pid:this.id});
          this.$store.commit(LOADING_END);
          if(res.data.res!=1){this.$store.commit(LOADING_END);alert(res.data.text);return};
          this.$router.push('/index')
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
                        item3.state=0;
                        item3.jointime='';
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
              this.jobs=newval.map(item=>item.job)
          },
          immediate:false,
          deep:true
      }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/theme.less";
.row{
  min-height: 400px;
  padding:0 20px;

  .title{
      width:100%;
      background-color: #fff;
      margin:10px 0;
      padding:10px 20px;
  }
  .box{
    background-color: lighten(@cut3,40%);
    color: darken(@cut4,50%);
    margin-bottom:10px;
    padding:10px 20px;
  }
}
@media screen and (min-width:768px){

    .row{

        .title{
            border-left:5px solid @cut2;
        }
    }
}
@media screen and (max-width:768px){
    .row{
        .title{
            text-align: center;
        }

    }
}

</style>