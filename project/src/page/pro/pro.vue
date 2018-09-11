<template>
  <div class="row h-100 align-content-start">
      <div class="col-md-2 second-nav" >
        <div class="box">
            <router-link :to="'/pro/'+id+'/index'" class="btn btn-light" v-if="power!=2">项目主页</router-link>
            <router-link :to="'/pro/'+id+'/order'" class="btn btn-light" >订单列表</router-link>
             <router-link :to="'/pro/'+id+'/daily'" class="btn btn-light" >施工日志</router-link>
            <router-link :to="'/pro/'+id+'/collect'" class="btn btn-light hidden-xs" v-if="power==0 || power==3">材料汇总</router-link>
            <div class="dropdown">
                <button type="button" class="btn btn-light dropdown-toggle" data-toggle="dropdown">
                更多
                </button>
                <div class="dropdown-menu">
  
                <router-link :to="'/pro/'+id+'/density'" class="dropdown-item " v-if="power==0">铝材线密度</router-link>
                 <router-link :to="'/pro/'+id+'/timeline'" class="dropdown-item ">项目动态</router-link> 
                <router-link :to="'/pro/'+id+'/collect'" class="dropdown-item  hidden-md" v-if="power==0 || power==3">材料汇总</router-link>
                <router-link :to="'/pro/'+id+'/set'" class="dropdown-item" v-if="power==0">设置</router-link>
                </div>
            </div>
            <div style="margin-top:100%;padding:10px;color:#fff;" class="text-center hidden-xs">
                <span class="text-muted">您在项目中的角色</span><br/><span>{{power | userJob}}</span>
            </div>
        </div>

      </div>
      <div class="col-md-10 user-page">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
import {checkPower,proInfo,proMembers} from '../../api/pro.js';
import {LOADING_START,LOADING_END} from '../../store/mutation_types.js';
export default{
  created(){
    this.id=this.$route.params.id;
    this.init();
  },
  data(){
    return{
      id:'',
      power:0
    }
  },
  methods:{
    async init(){
          this.$store.commit(LOADING_START)
          let res=await checkPower({id:this.id})
          if(res.data.res!=1){this.$store.commit(LOADING_END);alert(res.data.text);this.$router.push('/home');return};
          this.power=res.data.body;
          this.$store.commit(LOADING_END)
      }
  },
  filters:{
      userJob(value){
          switch(value){
              case 0:return '创建者';
              case 1:return '参与人';
              case 2:return '材料商';
              case 3:return '领导';
              default :return '未知';
          }
      }
  }
}

</script>

<style scoped lang="less">
@import "../../assets/css/theme.less";
@media screen and (min-width:768px){
    .box{
        height:100%;
        position:fixed;
        max-width: 180px;
        min-width:150px;
        width:15%;
        padding:20px 0;
        background-color: @cut4;  
       flex-direction: column;
        justify-content: flex-start !important;
        background-image: url(data:image/png;base64,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);

       .btn{
           font-size: 1rem;
           min-width:100px;
           width: 60%;
           margin: 10px auto;
           margin-left: 2rem;
       }
    }
}
@media screen and (max-width:768px){
    .box{
       background-color:@cut2;
       padding:15px 0;
       flex-direction: row;
        .btn{
           font-size: 12px;
           margin: 0 5px;
       }
    }
    .second-nav{
        box-shadow: 0 5px 10px #9d9d9d;
        height:57px;
    }
}
.second-nav{
    position:relative;
    min-height:30px;
    padding:0 10px;
}
.box{
    display: flex;
    justify-content: center;
    box-shadow: none;
    padding-bottom: 10px;
    .btn{
        border-radius: 5px !important;
    }
}
a.router-link-active{
    background-color: @cut3;
    color:#fff;
}

</style>
