<template>
  <div class="row d-flex align-items-start h-100 topdiv">
    <div class="col-md-3 left h-100 hidden-xs bg-white">
      
    </div>
  	 <div class="col-md-9 h-100" style="border-radius:10px">
       <div class="row title box">
           <h5 style="font-weight:900"><i class="iconfont icon-gongchengliebiao"></i>工程列表</h5>
            <div class="btn-group btn-group-right">
              <router-link to="/addPro" class="btn btn-primary" >新建工程</router-link>
            </div>
       </div>
        <div class="row right">
          <div class="col-md-12 box snav">
           <div class="form-inline">
              <select class="form-control" id="sel1">
                <option>按加入时间</option>
                <option>按创建时间</option>
                <option>按访问时间</option>
              </select>
            </div>
            <div class="func">
              <button class="btn btn-primary" :class="{'btn-outline-primary':listType==1}" @click="listType=0">
                <i class="iconfont icon-liebiao"></i>
              </button>
              <button class="btn btn-primary" :class="{'btn-outline-primary':listType==0}" @click="listType=1">
                <i class="iconfont icon-tubiao_kuaizhuangpailie"></i>
              </button>
            </div>
          </div>
            <div class="item col-md-4  h-100" v-for="(item,key) in pros" :key="key" v-if="listType==1">
                 <div class="card" >
                   <i class="iconfont icon-gongcheng card-img-top">{{item.job | jobname}}</i>
                    <div class="card-body">
                      <h5 class="card-title">{{item.name}}</h5>
                      <router-link :to="'/pro/'+item.id" class="btn btn-primary">查看工程</router-link>
                    </div>
                    <p class="card-text">{{item.job==0?'创建':'加入'}}于{{item.jointime==''?item.createtime:item.jointime | time}}</p>
                  </div>
            </div>
            <ul class="list-group col-md-12 h-100" style="padding-left:15px" v-if="listType==0">
              <router-link :to="'/pro/'+item.id" class="list-group-item list-group-item-light d-flex justify-content-between align-items-center" v-for="(item,key) in pros" :key="key" >
                  <div class="font-size:.5rem">{{item.name}}</div>
                  <div style="font-size:.5rem"><span class="badge badge-info"  style="margin-left:.5rem;padding:5px 8px">{{item.job | jobname}}</span></div>
              </router-link>
            </ul>
            
       </div> 
    </div>
  </div>
</template>

<script>
import {LOADING_START,LOADING_END} from '../../store/mutation_types.js';
import {show_pro} from '../../api/pro.js';
export default {
  created(){
    this.init();
  },
  data(){
    return {
      listType:0,
      pros:[],
    }
  },
  methods:{
    async init(){
      this.$store.commit(LOADING_START)
      let res=await show_pro();
      this.$store.commit(LOADING_END)
      if(res.data.res!=1){
          if(res.data.text=='没有登陆'){
            return;
          }else{
            alert(res.data.text);return;
          }
        }
      this.pros=res.data.body;
    }
  },
  filters:{
    jobname(value){
      switch(value){
        case 0:return '创建者';break;
        case 1:return '参与者';break;
        case 2:return '材料商';break;
        case 3:return '领导';break;
      }
    },
    time(value){
        var now = new Date(parseInt(value));
        let y = now.getFullYear();
        let m = now.getMonth() + 1;
        let d = now.getDate();
        return `${y}-${m}-${d}`;
    }
  }
}
</script>

<style scoped lang="less">
.topdiv{
  background-color: #fff !important;
}
@import "../../assets/css/theme.less";
  .searchBox{
    background-color: @cut2;
  }
.left{

  .box{
    position: relative;
    padding:20px 0 10px 0;
    margin-top: 10px;
    .row{
      margin-bottom: 10px;
    }
  }
  input{
    margin:0 auto;
  }
  .search{
    margin: 0 auto;
  }
}
.right{
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  background-color: #fff;
  margin: 0;
  padding:10px 0;
  .item{
    margin-bottom: 10px;
    .card{
      width: 100%;
      margin:0 auto;
      i{
        background-color: @cut2;
        color:#fff;
        padding:2px 10px;
        display: flex;
        justify-content: space-between;
      }
      p{
        position: absolute;
        right: 10px;
        bottom:5px;
        font-size: 10px;
        color:#ccc;
      }
    }
  }
  .snav{
    border-top:1px solid #ececec;
    height:55px;
    margin-bottom: 10px;
    padding:5px 15px;
    display: flex;
    justify-content: space-between;
    .func{
      display: flex;
      justify-content: space-around;
      align-content: center;
      .btn{
        margin-left: 10px;
      }
    }
  }
}
.title{
  margin:10px 0 0 0;
  height:40px;
  background-color: #fff;
  justify-content: space-between;
  align-content: center;
  padding:30px 10px;
  align-items: center;
  h5{
    font-size: 1rem;
    display: flex;
    align-content: center;
    margin-bottom: 0;
  }
}
  
</style>
