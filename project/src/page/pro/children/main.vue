<template>
  <div class="row align-content-start">
      <div class="col-md-12 title ctitle"><h4>{{details.name}}</h4></div>
      <div class="col-md-12 box title d-flex justify-content-between" style="margin-bottom:0">
        <div class="font-weight-bold" style="border-bottom:3px solid #ececec">项目概况</div>

      </div>
      <div class="col-md-12 ">
        <div class="row infoList box" style="padding-top:5px">
          <div class="col-md-6 infoItem">工程代号:{{details.number}}</div>
          <div class="col-md-6 infoItem">项目地址:{{details.address}}</div>
          <div class="col-md-6 infoItem">建设单位:{{details.yezhu}}</div>
          <div class="col-md-6 infoItem">建筑设计单位:{{details.design}}</div>
          <div class="col-md-6 infoItem">总包单位:{{details.danwei}}</div>
          <div class="col-md-6 infoItem">幕墙设计单位:{{details.mdanwei}}</div>
          <div class="col-md-6 infoItem infoItem-2">订单数:{{details.orderNum}}</div>
          <div class="col-md-6 infoItem infoItem-2">参与人数:{{details.memberNum}}</div>
          <div class="col-md-6 infoItem infoItem-2">创建人:{{details.creater}}</div>
          <div class="col-md-6 infoItem infoItem-2">创建时间:{{details.createtime | timeFilter}}</div>
        </div>
      </div>
      <div class="col-md-12 box title" style="margin-bottom:0">
        <div class="font-weight-bold" style="border-bottom:3px solid #ececec">项目动态</div>
      </div>
      <div class="col-md-12 ">
        <div class="row infoList box" style="padding-top:5px">
          <div class="col-md-12 infoItem infoItem-3 border-bottom" v-for="(item,key) in news" :key="key" v-if="key<5"><span class="badge badge-pill badge-default">{{item.time | timeFilter}}</span>{{item.text}}</div>
          <div class="col-md-12"><router-link :to="'timeline'" class="w-100 d-block btn btn-light" style="margin-top:10px" >查看全部</router-link></div>
        </div>
      </div>
      <div class="col-md-12 box title" style="margin-bottom:0">
        <div class="font-weight-bold" style="border-bottom:3px solid #ececec">主材进度</div>
      </div>
      <div class="col-md-12 ">
        <div class="row infoList box" style="padding-top:5px">
            <div class="col-md-6 chart"><div  id="myChart1" :style="{'width':'100%','height':charHeight}"></div></div>
            <div class="col-md-6 chart"><div  id="myChart2" :style="{'width':'100%','height':charHeight}"></div></div>
            <div class="col-md-6 chart"><div  id="myChart3" :style="{'width':'100%','height':charHeight}"></div></div>
            <div class="col-md-6 chart"><div  id="myChart4" :style="{'width':'100%','height':charHeight}"></div></div>
        </div>
      </div>
      <!-- <div class="col-md-6">
        <div class="charts">
          <div>主材进度</div>
          <div id="myChart1" style="width:100%px;height:300px"></div>
        </div>
      </div> -->
<!-- 模态框 -->

  </div>
</template>

<script>
import {details} from '../../../api/pro.js';
import {getTimeLine} from '../../../api/timeline.js'
import {getTotal} from '../../../api/collect.js';
import {LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
import echarts from 'echarts';
export default {
    created(){
        this.init();
    },
  data(){
    return {
        details:{},
        news:[],
        total:{},
        options1:{
          title: {
              text: '铝型材进度',
              // subtext: '数据来自网络'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              data: ['预计', '提料','到货']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              splitNumber:2
          },
          yAxis: {
              type: 'category',
              data: ['铝型材','钢型材','玻璃','石材']
          },
          series: [
              {
                  name: '预计',
                  type: 'bar',
                  data: [18203, 23489, 29034, 104970]
              },
              {
                  name: '提料',
                  type: 'bar',
                  data: [19325, 23438, 31000, 121594]
              },{
                  name:'到货',
                  type: 'bar',
                  data:[1225,23125,12325,16325]
              }
          ]
      },
      options2:{
          title: {
              text: '钢型材进度',
              // subtext: '数据来自网络'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              data: ['预计', '提料','到货']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              splitNumber:2
          },
          yAxis: {
              type: 'category',
              data: ['铝型材','钢型材','玻璃','石材']
          },
          series: [
              {
                  name: '预计',
                  type: 'bar',
                  data: [18203, 23489, 29034, 104970]
              },
              {
                  name: '提料',
                  type: 'bar',
                  data: [19325, 23438, 31000, 121594]
              }
          ]
      },
      options3:{
          title: {
              text: '板材进度',
              // subtext: '数据来自网络'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              data: ['预计', '提料','到货']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              splitNumber:2
          },
          yAxis: {
              type: 'category',
              data: ['铝型材','钢型材','玻璃','石材']
          },
          series: [
              {
                  name: '预计',
                  type: 'bar',
                  data: [18203, 23489, 29034, 104970]
              },
              {
                  name: '提料',
                  type: 'bar',
                  data: [19325, 23438, 31000, 121594]
              }
          ]
      },
      options4:{
          title: {
              text: '钢加工件',
              // subtext: '数据来自网络'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              data: ['预计', '提料','到货']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              splitNumber:2
          },
          yAxis: {
              type: 'category',
              data: ['铝型材','钢型材','玻璃','石材']
          },
          series: [
              {
                  name: '预计',
                  type: 'bar',
                  data: [18203, 23489, 29034, 104970]
              },
              {
                  name: '提料',
                  type: 'bar',
                  data: [19325, 23438, 31000, 121594]
              }
          ]
      },
    }
  },
  methods:{ 
      async init(){
        this.$store.commit(LOADING_START);
        let res=await getTotal({pro:this.$route.params.id});
        let res2=await getTimeLine({pid:this.$route.params.id});
        let res3=await details({pid:this.$route.params.id})
        this.$store.commit(LOADING_END);
        if(res.data.res==0){alert(res.data.text);return};
        if(res2.data.res==0){alert(res2.data.text);return};
        if(res3.data.res==0){alert(res3.data.text);return};
        this.details=res3.data.body;
        this.total=res.data.body;
        this.news=res2.data.body;
        this.options1.series=this.seriesList.lv.series;
        this.options1.yAxis=this.seriesList.lv.yAxis;
        this.options2.series=this.seriesList.gang.series;
        this.options2.yAxis=this.seriesList.gang.yAxis;
        this.options3.series=this.seriesList.ban.series;
        this.options3.yAxis=this.seriesList.ban.yAxis;
        this.options4.series=this.seriesList.jian.series;
        this.options4.yAxis=this.seriesList.jian.yAxis;
        window.draw=this.draw;
        setTimeout(function(){
            this.draw();
        },100)
      },
      draw(){
        let myChart1 = echarts.init(document.getElementById('myChart1')) ;
        myChart1.setOption(this.options1)
            let myChart2 = echarts.init(document.getElementById('myChart2')) ;
        myChart2.setOption(this.options2)
            let myChart3 = echarts.init(document.getElementById('myChart3')) ;
        myChart3.setOption(this.options3)
            let myChart4 = echarts.init(document.getElementById('myChart4')) ;
        myChart4.setOption(this.options4)
      }
  },
  mounted(){

  },
  computed:{
      charHeight(){
          let arr=Object.keys(this.total).map(item=>this.total[item]['list'].length);
          let max=Math.max.apply(null,arr);
          if(max<=5){
              return '200px';
          }else if(max<=10){
              return '400px';
          }else if(max<=15){
              return '600px'
          }else{
              return '800px'
          }
      },
      seriesList(){
          let titles=Object.keys(this.total);
          let result={};
          titles.forEach(item=>{
              result[item]={
                  series:[
                    {
                        name:'预计',
                        type:'bar',
                        data:this.total[item].list.map(item2=>item2.yuji)
                    },
                    {
                        name:'提料',
                        type:'bar',
                        data:this.total[item].list.map(item2=>item2.total)
                    },
                    {
                        name:'到货',
                        type:'bar',
                        data:this.total[item].list.map(item2=>item2.finish)
                    }
                  ],
                  yAxis:{
                      type:'category',
                      data:this.total[item].list.map(item2=>item2.name+'【'+(item2.code?item2.code:item2.standard)+'】'),
                      axisLabel:{
                          formatter:function(val){
                            if(val.length>6){
                                return val.substring(0,6)+'...'
                            }else{
                                return val
                            }
                          }
                      }
                  }
              }
          })
          return result;
      }
  },
  filters:{
        timeFilter(value){
            var now = new Date(parseInt(value)),
                y = now.getFullYear(),
                m = now.getMonth() + 1,
                d = now.getDate();
            return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
        }
  }
}
</script>

<style scoped lang="less">
@import "../../../assets/css/theme.less";
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
  .infoItem-2::before{
    content:'';
    display: inline-block;
    margin-right: 5px;
    width: 10px;
    height:10px;
    border-radius: 50%;
    background-color:#06b387
  }
  .infoItem-3::before{
    content:'';
    display: inline-block;
    margin-right: 5px;
    width: 10px;
    height:10px;
    border-radius: 50%;
    background-color:@cut2
  }
}
.row{
  .title{
      width:100%;
      background-color: #fff;
      margin:10px 0;
      padding:10px 20px;
  }
  .box{
    background-color: #fff;
    margin-bottom:15px;
    padding:10px 20px;
  }
}
.chart{
    min-height:400px;
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
            padding-left:30px;
        }
        .ctitle{
            text-align: center
        }

    }
}
</style>