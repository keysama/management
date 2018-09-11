<template>
  <div class="row toprow align-content-start">
    <div class="col-md-12">
      <div class="col-md-12 text-left title d-flex justify-content-between align-items-center" >
        <h4>项目动态</h4>
      </div>
      <div class="col-md-12 timeLine infoList" style="background-color:#fff">
          <div class="timeLine-line"></div>
          <div class="timeLine-item" v-for="(item,key) in list" :key="key">
              <div class="timeLine-itemhead">
                  <span class="infoItem">{{item.text}}</span> 
              </div>
              <div class="timeLine-itemmark">
                {{item.time | timeFilter}}
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import {LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
import {getTimeLine} from '../../../api/timeline.js'
export default {
    data(){
        return {
            list:[]
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(){
            this.$store.commit(LOADING_START);
            let res=await getTimeLine({pid:this.$route.params.id});
            this.$store.commit(LOADING_END);
            if(res.data.res==0){alert(res.data.text);return};
            this.list=res.data.body;
        }
    },
    filters:{
        timeFilter(value){
            var now = new Date(parseInt(value)),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            return (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
        }
    }
}

</script>

<style scoped lang="less">
@import "../../../assets/css/theme.less";

.timeLine{
    position: relative;
    padding-top:20px;
    padding-bottom:30px;
    .timeLine-itemhead{
        font-size: 14px;
        border-bottom:1px solid @cut2;
        padding-bottom: 5px;
    }
    .timeLine-itembody{
        padding-left: 10px;
        padding-top: 5px;
    }
    .timeLine-itemmark{
        position: absolute;
        bottom:2px;
        font-size: 12px;
        right:10px;
    }
    .timeLine-line{
        position: absolute;
        top:0;
        left: 0;
        height: 100%;
        width: 5px;
        background-color: @cut2;
        border-radius: 5px;
    }
    .timeLine-item{
        max-width: 650px;
        position: relative;
        background-color: #fff;
        padding:10px 20px 20px 20px;
    }
}
.infoList{
  .infoItem::before{
    content:'';
    display: inline-block;
    margin-right: 5px;
    width: 10px;
    height:10px;
    border-radius: 50%;
    background-color:#e03232
  }
}
.row{
  .title{
      width:100%;
      background-color: #fff;
      margin:10px 0;
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

}

.toprow{
  min-height: 400px;
  padding:0 5px;
  .box{
    background-color: #fff;
    margin-bottom:15px;
    padding:10px 20px;
  }
}


</style>
