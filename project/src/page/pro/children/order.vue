<template>
  <div class="row h-100 align-content-start">
      <div class="col-md-12 d-flex justify-content-between align-items-center title">
        <div><i class="iconfont icon-gongchengliebiao" style="font-size:1.5rem">订单列表</i></div>
        <div class="d-flex justify-content-center" style="flex-direction:column"><span  class="badge badge-info pointer" style="font-size:10px;padding:10px" data-toggle="modal" data-target="#templet">下载订单模板</span></div>
      </div>
      <div class="col-md-12" style="padding:0 5px;">
        <div style="background-color:#fff;width:100%;padding:5px 10px;border-top:1px solid #ececec">
          <div class="d-flex justify-content-between align-items-center infoList">
            <span class="infoItem">订单总数：{{orderList?orderList.length:0}}</span>
            <div>
              <!-- <span class="btn btn-primary" style="font-size:10px">导出订单</span> -->
              <router-link to="orderAdd" class="btn btn-primary" :class="{disabled:!allow_addOrder}" style="font-size:10px"><i class="iconfont icon-icon10" style="font-size:10px">创建订单</i></router-link>
              
              </div>
          </div>
          <div class="card-body">
            <div class="d-flex "  style="margin-bottom:20px">
              <select class="form-control filte_bar" v-model="order_kind">
                <option value="0">全部</option>
                <option value="1">铝型材</option>
                <option value="2">钢型材</option>
                <option value="3">板材</option>
                <option value="4">钢加工件</option>
                <option value="5">辅助材料</option>
              </select>
              <select class="form-control filte_bar" v-model="order_time">
                <option value="0">时间正序</option>
                <option value="1">时间倒序</option>
              </select>
            </div>
<div class="table-responsive ">
          <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>名称</th>
                  <th>类型</th>
                  <th>位置</th>
                  <th>送货地点</th>
                  <th>提料单数</th>
                 <th>备注</th>
                 <th>创建时间</th> 
                 <th>流程</th>
                  <th>操作</th> 
                </tr>
              </thead>
              <tbody>
                <tr @click="fakeA(item.id)" v-for="(item,key) in orderLists" :key="key" data-toggle="tooltip" :title="item.title" v-if="parseInt(power)!=2 || item.auditor==$store.state.userInfo.id">
                  <td class="omit" :class="{'bg-info':item.auditor==$store.state.userInfo.id,'text-white':item.auditor==$store.state.userInfo.id}">{{key+1}}</td>
                  <td class="omit" >{{item.title}}</td>
                  <td class="omit">{{item.type | typeFilter}}</td>
                  <td class="omit">{{item.position}}</td>
                  <td class="omit">{{item.target_position}}</td>
                  <td class="omit">{{item.sheetNum}}</td>
                  <td class="omit">{{item.remark}}</td>
                  <td class="omit">{{item.timestemp | timeFilter}}</td>
                  <td class="step-box">
                    <div class="d-flex justify-content-center align-items-center">
                        <span class="step step1 text-center" :class="{'active':item.processing!='' && (item.processing!=1 || item.processing!=2),'bg-warning':item.processing?item.processing.split(';')[0]==1:false,'bg-danger':item.processing?item.processing.split(';')[0]==2:false}" style="flex:1">{{item.processing | step_text(1)}}</span>
                        <span class="step step2 text-center" :class="{'active':item.processing?item.processing.split(';')[0]==6:false,'bg-warning':item.processing?item.processing.split(';')[0]==4:false,'bg-danger':item.processing?item.processing.split(';')[0]==5:false}" style="flex:2">{{item.processing | step_text(2)}}</span>
                        <span class="step step3 text-center" :class="{'active':item.processing?item.processing.split(';')[0]==6:false}" style="flex:2">{{item.processing | step_text(3)}}</span>
                    </div>
                    <span class="tip">{{item.processing | process}}</span>
                  </td>
                  <td class="d-flex func justify-content-center" v-if="item.user==$store.state.userInfo.id || allow_control">
                    <button class="btn btn-info" style="margin-right:5px" @click.stop v-if="item.processing==''?true:item.processing.split(';')[0]==2 || item.processing.split(';')[0]==5 " @click="stepEedit(item.id)">修改</button>
                    <button class="btn btn-success" style="margin-right:5px" @click.stop v-if="item.processing==''?true:item.processing.split(';')[0]==2 || item.processing.split(';')[0]==3 || item.processing.split(';')[0]==5" @click="stepHandle(item.id)">提交</button>
                    <button class="btn btn-lighte" style="margin-right:5px" @click.stop v-if="item.processing==''?false:item.processing.split(';')[0]==1 || item.processing.split(';')[0]==4" @click="stepBack(item.id)">撤销</button>
                    <button class="btn btn-danger" @click.stop v-if="item.processing==''?true:item.processing.split(';')[0]!=6" @click="stepDelete(item.id)">删除</button>
                  </td>
                </tr>
              </tbody>
          </table>
          </div> 
            <!-- <div class="table-responsive">
              <table class="table">
                  <thead>
                    <tr>
                      <th>编号</th>
                      <th>名称</th>
                      <th>创建时间</th>
                      <th>更新时间</th>
                      <th>创建人</th>
                      <th>Country</th>
                      <th>Sex</th>
                      <th>Example</th>
                      <th>Example</th>
                      <th>Example</th>
                      <th>Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Anna</td>
                      <td>Pitt</td>
                      <td>35</td>
                      <td>New York</td>
                      <td>USA</td>
                      <td>Female</td>
                      <td>Yes</td>
                      <td>Yes</td>
                      <td>Yes</td>
                      <td>Yes</td>
                    </tr>
                  </tbody>
              </table>
              </div> -->
          </div> 
        </div>
      </div>

<!-- ---------修改页----------- -->
<!-- 按钮：用于打开模态框 -->
<!-- 模态框 -->
<div class="modal fade" id="order_edit">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">{{order_edit.title}}</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
        <div class="row">
          <div class="col-md-12">
            <h4>基础信息</h4>
            <div class="form-group"  style="margin-top:20px;border-top:1px solid #ececec">
                <label class="mulit">订单名称</label>
                <input type="text" class="form-control" v-model="order_edit.title">
            </div>
            <div class="form-group">
                <label >位置</label>
                <input type="text" class="form-control" v-model="order_edit.position">
            </div>
            <div class="form-group">
                <label >送货地点</label>
                <input type="text" class="form-control" v-model="order_edit.target_position">
            </div>
            <div class="form-group">
                <label>技术要求</label>
                <input type="text" class="form-control" v-model="order_edit.specifications">
            </div>
            <div class="form-group">
                <label>备注</label>
                <textarea class="form-control" rows="2" style="resize:none" v-model="order_edit.remark"></textarea>
            </div>
          </div>

        </div>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" @click="editHandle">修改</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
      </div>
 
    </div>
  </div>
</div>


<!-- -------提交↓------- -->
 
    <!-- 模态框 -->
    <div class="modal fade" id="tijiao">
      <div class="modal-dialog">
        <div class="modal-content">
    
          <!-- 模态框头部 -->
          <div class="modal-header">
            <h4 class="modal-title">选择审核人</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
    
          <!-- 模态框主体 -->
          <div class="modal-body">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(item,key) in workers" :key="key">
                <div>
                  <span>{{item.nickname}}<span class="badge badge-pill badge-info" style="margin-left:10px">{{item.job | userJob}}</span></span>
                </div>
                <div>
                  <span class="btn btn-info" @click="selectWorker(item.id,item.order)">提交</span>
                </div>
              </li>
            </ul>
          </div>
    
          <!-- 模态框底部 -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
          </div>
    
        </div>
      </div>
    </div>

<!-- -------提交↑------- -->

<!-- ------------模板下载↓------------- -->
<!-- 模态框 -->
<div class="modal fade" id="templet">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">选择模板</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(item,key) in Object.keys(templet)" :key="key">
            <span>{{item}}</span>
            <span class="btn btn-success" @click="download(templet[item])">下载</span>
          </li>
        </ul>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
      </div>
 
    </div>
  </div>
</div>
<!-- ------------模板下载↑------------- -->
  </div>
</template>

<script>
import {checkPower} from '../../../api/pro.js';
import {templet_url} from '../../../config/env.js';
import {LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
import {getOrderList,edit_order,delete_order,getWorkers,examine,examine_back} from '../../../api/order.js';
export default {
  created(){
    this.init();
  },
  data(){
    return {
      power:'',
      orderList:[],
      order_kind:0,
      order_time:0,
      order_edit:{},
      workers:[],
      templet:{
        '铝型材提料单模板':'templet_lv.xlsx',
        '钢型材提料单模板':'templet_gang.xlsx',
        '钢加工件提料单模板':'templet_jian.xlsx',
        '板材提料单模板':'templet_ban.xlsx',
        '辅助材料提料单模板':'templet_fu.xlsx'
       }
    }
  },
  methods:{
    async init(){
      this.$store.commit(LOADING_START);
      let res=await getOrderList(this.$route.params.id);
      let res1=await checkPower({id:this.$route.params.id})
      this.$store.commit(LOADING_END);
      if(res.data.res==0){alert(res.data.text);return};
      // if(res1.data.res==0){alert(res.data.text);return};
      this.orderList=res.data.body;
      this.power=res1.data.body;
    },
    fakeA(orderId){
      this.$router.push('/pro/'+this.$route.params.id+'/order/'+orderId)
    },
    stepEedit(value){
      if(!this.allow_editOrder && this.orderList.filter(item=>item.id==value)[0].user!=this.$store.state.userInfo.id){alert('修改该订单需要该订单的创建者、或有修改权限');return;}
      this.order_edit=this.orderList.filter(item=>item.id==value)[0];
      $("#order_edit").modal()
    },
    async stepHandle(value){
      let pro=this.orderList.filter(item=>item.id==value)[0].project
      this.$store.commit(LOADING_START);
      let res=await getWorkers({pro:pro});
      this.$store.commit(LOADING_END);
      if(res.data.res==0){alert(res.data.text);return};
//根据提交种类筛选可选人
      let process=this.orderList.filter(item=>item.id==value)[0].processing;
      let type=(!process || process=='')?0:parseInt(process.split(';')[0]);
      if(type<=2){
        this.workers=this.filterWorkers(res.data.body,0,value);
      }else{
        this.workers=this.filterWorkers(res.data.body,1,value);
      }
      $('#tijiao').modal('show');
    },　
    async stepBack(value){
      if(!confirm('确认撤销？')){return;}
      this.$store.commit(LOADING_START);
      let res=await examine_back({order:value});
      this.$store.commit(LOADING_END);
      if(res.data.res==0){alert(res.data.text);return};
      this.init();
    },
    async stepDelete(value){
    if(!this.allow_deleteOrder && this.orderList.filter(item=>item.id==value)[0].user!=this.$store.state.userInfo.id){alert('删除该订单需要该订单的创建者、或有删除权限');return;}
    if(!window.confirm('确认删除订单？')){return;}
    // if(this.allow_deleteOrder || )
			this.$store.commit(LOADING_START);
			let res=await delete_order({order:value,project:this.$route.params.id});
			this.$store.commit(LOADING_END);
			if(res.data.res==0){alert(res.data.text);return};
			this.orderList=this.orderList.filter(item=>item.id!=value);

    },
    async editHandle(){
      this.$store.commit(LOADING_START);
      let res=await　edit_order(this.order_edit)
      this.$store.commit(LOADING_END);
      if(res.data.res==0){alert(res.data.text);return};
    },
    filterWorkers(workers,type,order){
      workers.forEach((item,key)=>{
        workers[key].order=order
      })
      //type:0,提交审核，选创建人和参与人
      //type:1,提交订单，选材料商
      switch(parseInt(type)){
        case 0:return workers.filter(item=>item.job<=1);break;
        case 1:return workers.filter(item=>item.job==2);break;
      }
    },
    async selectWorker(worker,order){
      let _order=this.orderList.filter(item=>item.id==order)[0];
      let type=(!_order.processing || _order.processinge=='' || parseInt(_order.processing.split(';')[0])<=2)?0:1;
      if(_order.user==worker){alert('不能选择该订单的上传者');return}
      this.$store.commit(LOADING_START);
      let res=await examine({uid:worker,order:order,type:type})
      this.$store.commit(LOADING_END);
      if(res.data.res==0){alert(res.data.text);return};
      $('#tijiao').modal('hide');
      this.init();
    },
    download(name){
      alert(templet_url+name)
      window.open(templet_url+name)
    }
  },
  computed:{
    orderLists(){
      if(!this.orderList){return []};
      let list=[];
      switch(parseInt(this.order_kind)){
        case 0:list=this.orderList;break;
        case 1:list=this.orderList.filter(item=>item.type==0);break;
        case 2:list=this.orderList.filter(item=>item.type==1);break;
        case 3:list=this.orderList.filter(item=>item.type==2);break;
        case 4:list=this.orderList.filter(item=>item.type==3);break;
        case 5:list=this.orderList.filter(item=>item.type==4);break;
      }
      switch(parseInt(this.order_time)){
        case 0:list=list.sort((a,b)=>{return a.timestemp-b.timestemp});break;
        case 1:list=list.sort((a,b)=>{return b.timestemp-a.timestemp});break;
      }
      return list;
    },
    allow_addOrder(){
      if(this.power===''){return false}
      return this.$store.state.jobList[this.power].indexOf(10)>=0 || this.$store.state.userInfo.type==0;
    },
    allow_deleteOrder(){
      if(this.power===''){return false}
      return this.$store.state.jobList[this.power].indexOf(20)>=0 || this.$store.state.userInfo.type==0;
    },
     allow_editOrder(){
      if(this.power===''){return false}
      return this.$store.state.jobList[this.power].indexOf(30)>=0 || this.$store.state.userInfo.type==0;
    },
      allow_control(){
      if(this.power===''){return false}
      return this.$store.state.jobList[this.power].indexOf(40)>=0 || this.$store.state.userInfo.type==0;
    },
  },
  filters:{
    process(value){
      if(!value || value==''){return ''};
      let type=value==''?0:value.split(';')[0];
      let current=value==''?'':value.split(';')[1];
      let time=value==''?'':value.split(';')[2];
      if(time && time!=''){
        var now = new Date(parseInt(time)),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
        time=(m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
      }else{
        time=''
      };
      switch (parseInt(type)){
        case 0 :return '未提交';break;
        case 1 :return '审核中,审核人:'+current+','+time;break;
        case 2 :return '未通过,审核人:'+current+','+time;break;
        case 3 :return '审核通过,请提交,审核人:'+current+','+time;break;
        case 4 :return '待查收,材料商:'+current+','+time;break;
        case 5 :return '被退回,材料商:'+current+','+time;break;
        case 6 :return '已查收,材料商:'+current+','+time;break;
        default:return '';
      }
    },
    userJob(value){
        switch(value){
            case 0:return '创建者';
            case 1:return '参与人';
            case 2:return '材料商';
            case 3:return '领导';
            default :return '未知';
        }
    },
    typeFilter(value){
      switch(parseInt(value)){
        case 0 : return '铝型材';break;
        case 1 : return '钢型材';break;
        case 2 : return '板材';break;
        case 3 : return '钢加工件';break;
        case 4 : return '辅助材料';break;
      }
    },
    timeFilter(value){
      var now = new Date(parseInt(value)),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
      return (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    },
    step_text(value,type){
      switch(type){
        case 1:
          switch(value.split(';')[0]){
            case '' : return '未提交';break;
            case '1' : return '待审核';break;
            case '2' : return '未通过';break;
            case '3' : return '审核';break;
            case '4' : return '审核';break;
            case '5' : return '审核';break;
            case '6' : return '审核';break;
          };break;
        case 2:
          switch(value.split(';')[0]){
            case '' : return '查收';break;
            case '1' : return '查收';break;
            case '2' : return '查收';break;
            case '3' : return '未选择';break;
            case '4' : return '待查收';break;
            case '5' : return '被退回';break;
            case '6' : return '查收';break;
          };break;
        case 3:
          switch(value.split(';')[0]){
            case '' : return '完成';break;
            case '1' : return '完成';break;
            case '2' : return '完成';break;
            case '3' : return '完成';break;
            case '4' : return '完成';break;
            case '5' : return '完成';break;
            case '6' : return '完成';break;
          };break;
      }
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
      margin:10px 0 0 0;
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
.filte_bar{
  width:40%;
  max-width: 200px;
}
.filte_bar:nth-child(2){

  margin-left:20px;
}
.infoList{
  .infoItem::before{
    content:'';
    display: inline-block;
    margin-right: 5px;
    width: 10px;
    height:10px;
    border-radius: 50%;
    background-color:@cut2;
    font-size:12px;
  }
}

.func{
  button{
    font-size: 10px;
  }
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
.table-responsive{
  text-align: center;
  th{
    white-space: nowrap;
  }
  tr{
    cursor: pointer;
    white-space: nowrap;
  }
  .omit{
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.step-box{
  font-size:12px;

  .step{
      background-color: #9d9d9d;
      color:#fff;
      position: relative;
      margin-right: 10px;
      padding:3px 0;
      min-width:60px;
      max-width:70px;
  }
  .active{
      background-color: @cut1;
  }
  .active::after{
      border-left: 10px solid @cut1 !important;
  }
  .bg-warning::after{
    border-left: 10px solid #ffc107 !important;
  }
  .bg-danger::after{
    border-left: 10px solid #dc3545 !important;
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
      right:-9px;
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
}
</style>