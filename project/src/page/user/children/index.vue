<template>
  <div class="row">
      <div class="col-md-3">
        <div class="userhead">
            <i class="iconfont icon-user" style="font-size:50px"></i>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card userinfo">
          <div class="card-header text-center">{{$store.state.userInfo.nickname}}</div>
          <div class="card-body text-center">所属部门：{{$store.state.userInfo.departments}}</div> 
          <div class="card-footer text-right"><small>上次登陆时间：2018-5-25</small></div>
        </div>
      </div>
      <div class="col-md-5 d-flex justify-content-center align-items-center">
        <router-link to="/home" class="btn btn-info">
          参与项目 <span class="badge badge-light">{{proCount}}</span>
        </router-link>
      </div>
      <div class="col-md-12 message" v-if="pro_message.length>0">
        <h4>消息动态</h4>
        <ul class="list-group" >
          <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(item,key) in pro_message" :key="key">
            <span>{{item.holder}}邀请你加入工程【{{item.name}}】</span>
            <div class="text-right" style="margin-left:10px;width: min-content;">
              <button type="button" class="btn btn-info" style="margin-top:5px" @click="agree(item.id)">接受</button>
              <button type="button" class="btn btn-danger" style="margin-top:5px" @click="disagree(item.id)">拒绝</button>
            </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import {LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
import {pro_invite,pro_invite_agree,pro_invite_disagree} from '../../../api/communion.js';
import {pro_count} from '../../../api/pro.js';
export default {
  created(){
    this.init()
  },
  data(){ 
    return {
       pro_message:[],
       proCount:0
    }
  },
  methods:{
    async init(){
      let res=await pro_invite();
      let res2=await pro_count();
      if(res.data.res!=1){alert(res.data.text);return;}
      if(res2.data.res!=1){alert(res2.data.text);return;}
      this.pro_message=res.data.body;
      this.proCount=res2.data.body;
    },
    async agree(id){
      this.$store.commit(LOADING_START);
      let res=await pro_invite_agree(id);
      this.$store.commit(LOADING_END);
      if(res.data.res!=1){alert(res.data.text);return;}
      this.pro_message=this.pro_message.filter(item=>item.id!=id);
    },
    async disagree(id){
      this.$store.commit(LOADING_START);
      let res=await pro_invite_disagree(id);
      this.$store.commit(LOADING_END);
      if(res.data.res!=1){alert(res.data.text);return;}
      this.pro_message=this.pro_message.filter(item=>item.id!=id);
    }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/theme.less";
.row{
  margin: 0 15px;
  padding-top:40px;
  padding-bottom:20px;
  min-height: 250px;
  background-color: #fff;
}
.userhead{
  background-color: #fcfcfc;
  width:100px;
  height:100px;
  border-radius: 50%;
  border:1px solid #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.userinfo{
  border:none;
  .card-header{
    background-color: #fff;
  }
  .card-footer{
    background-color: #fff;
  }
}
.message{
  margin-top: 20px;
  border-top:5px solid #ececec;
  padding-top:10px;
}

</style>
