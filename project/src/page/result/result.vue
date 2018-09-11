<template>
  <div class="row h-100 align-content-start">
      <div class="col-md-2 second-nav" >
        <div class="box">
            <a href="#pro"  class="btn btn-light" >相关工程</a>
            <a href="#order"  class="btn btn-light" >相关订单</a>
            <a href="#form" class="btn btn-light" >相关提料单</a>
        </div>

      </div>
        <div class="col-md-10 user-page">
        <div class="row toprow align-content-start">
            <div class="col-md-12">
                <div class="col-md-12 text-left title d-flex justify-content-between align-items-center" >
                <h4 style="word-break:break-all"><i class="iconfont icon-sousuo" style="font-size:1.5rem">搜索结果</i></h4>
            </div>
        <div class="col-md-12 title" style="margin-bottom:0">关键词：{{text}}</div>
        <div class="col-md-12 bbox infoList">
            <div class="infoItem" id="pro">相关工程</div>
            <div class="text-secondary text-center" v-if="results.project&&results.project.length<=0">无结果</div>
            <ul class="list-group col-md-12" style="padding-left:15px;margin:10px 0;" v-if="results.project&&results.project.length>0">
              <router-link :to="'/pro/'+item.id" class="list-group-item list-group-item-light d-flex justify-content-between align-items-center" v-for="(item,key) in results.project" :key="key">
                  <div class="font-size:.5rem">{{item.name}}</div>
                  <div style="font-size:.5rem"></div>
              </router-link>
            </ul>
            <div class="infoItem" id="order">相关订单</div>
            <div class="text-secondary text-center" v-if="results.order&&results.order.length<=0">无结果</div>
<div class="table-responsive" style="margin:10px 0;" v-if="results.order&&results.order.length>0">
          <table class="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>名称</th>
                  <th>类型</th>
                  <th>位置</th>
                  <th>送货地点</th>
                 <th>备注</th> 
                 <th>状态</th>
                </tr>
              </thead>
              <tbody>
                <tr @click="fakeA(item.project)" v-for="(item,key) in results.order" :key="key">
                  <td>{{key+1}}</td>
                  <td>{{item.title}}</td>
                  <td>{{item.type}}</td>
                  <td>{{item.position}}</td>
                  <td>{{item.target_position}}</td>
                  <td>{{item.remark}}</td>
                  <td class="step-box">
                    <div class="d-flex justify-content-center align-items-center stepp">
                        <span class="step step1 text-center" style="flex:1" :class="{'active':item.processing!='' && (item.processing!=1 || item.processing!=2),'bg-warning':item.processing?item.processing.split(';')[0]==1:false,'bg-danger':item.processing?item.processing.split(';')[0]==2:false}">未提交</span>
                        <span class="step step2 text-center" style="flex:2" :class="{'active':item.processing?item.processing.split(';')[0]==6:false,'bg-warning':item.processing?item.processing.split(';')[0]==4:false,'bg-danger':item.processing?item.processing.split(';')[0]==5:false}">查收</span>
                        <span class="step step3 text-center" style="flex:2" :class="{'active':item.processing?item.processing.split(';')[0]==6:false}">完成</span>
                    </div>
                  </td>
                </tr>
              </tbody>
          </table>
          </div> 
           <div class="infoItem">
               <span id="form">相关提料单</span> 
               
            </div>
            <div class=" d-flex justify-content-between align-items-center" v-if="results.sheet&&results.sheet.lv.length>0">
              <div><span class="infoItem1">铝型材</span></div>
              <button class="btn btn-primary btn-sm" style="float:right" @click="down_lv=true" v-if="down_lv==false">导出</button>
              <button class="btn btn-info btn-sm" style="float:right" @click="toExcel_lv" v-if="down_lv==true">确定</button>
            </div>
            <div class="table-responsive" style="margin:10px 0;max-height:300px;overflow-y:scroll;display:block" v-if="results.sheet&&results.sheet.lv.length>0">
                <table class="table table-hover" style="width:100%" id="sheets_lv">
                  <thead>
                    <tr>
                      <th v-show="down_lv"><input type="checkbox" v-model="form_lv_all"></th>
                      <th>名称</th>
                      <th>型材代号</th>
                      <th>材质</th>
                      <th>表面喷涂处理</th>
                      <th>喷涂色号</th>
                      <th>长度(m)</th>
                      <th>数量(支)</th>
                      <th>线密度</th>
                      <th>每支重量</th>
                      <th class="text-info">总重</th>
                      <th>备注</th>  
                    </tr>
                  </thead>
                  <tbody >
                    <tr v-for="(item,key) in results.sheet.lv" :key="key" @click="fakeB(item.pid,item.oid)">
                      <td v-show="down_lv" @click.stop><input type="checkbox" :value="key" v-model="form_lv"></td>
                      <td class="omit">{{item.name}}</td>
                      <td class="omit">{{item.code}}</td>
                      <td class="omit">{{item.quality}}</td>
                      <td class="omit">{{item.dispose}}</td>
                      <td class="omit">{{item.color}}</td>
                      <td class="omit">{{item.length}}</td>
                      <td class="omit">{{item.num}}</td>
                      <td class="omit">{{item.rou}}</td>
                      <td class="omit text-info">{{item.rou?(item['rou']*item['length']).toFixed(3):'未填写线密度'}}</td>
                      <td class="omit text-info">{{item.rou?(item['rou']*item['length']*item.num).toFixed(3):'未填写线密度'}}</td>
                      <td class="omit">{{item.remark}}</td>
                    </tr>
                  </tbody>
              </table>
             </div>
<!-- ---------------------- -->
            <div class=" d-flex justify-content-between align-items-center" v-if="results.sheet&&results.sheet.gang.length>0">
              <div><span class="infoItem1">钢型材</span></div>
              <button class="btn btn-primary btn-sm" style="float:right" @click="down_gang=true" v-if="down_gang==false">导出</button>
              <button class="btn btn-info btn-sm" style="float:right" @click="toExcel_gang" v-if="down_gang==true">确定</button>
            </div>
            <div class="table-responsive" style="margin:10px 0;max-height:300px;overflow-y:scroll;display:block" v-if="results.sheet&&results.sheet.gang.length>0">
            <table class="table table-hover" style="width:100%" id="sheets_gang">
              <thead>
                <tr>
                  <th v-show="down_gang"><input type="checkbox" v-model="form_gang_all"></th>
                  <th>名称</th>
                  <th>规格</th>
                  <th>材质</th>
                  <th>表面处理方式</th>
                  <th>长度(m)</th>
                  <th>数量(支)</th>
                  <th>每支重量</th>
                  <th class="text-info">总重</th>
                  <th>备注</th> 
                </tr>
              </thead>
              <tbody >
                <tr v-for="(item,key) in results.sheet.gang" :key="key" @click="fakeB(item.pid,item.oid)">
                  <td v-show="down_gang"><input type="checkbox" :value="key" v-model="form_gang"  @click.stop></td>
                  <td class="omit">{{item.name}}</td>
                  <td class="omit">{{item.standard}}</td>
                  <td class="omit">{{item.quality}}</td>
                  <td class="omit">{{item.dispose}}</td>
                  <td class="omit">{{item.length}}</td>
                  <td class="omit">{{item.num}}</td>
                  <td class="omit">{{item.rou}}</td>
                  <td class="omit text-info">{{(item.rou*item.num).toFixed(3)}}</td>
                  <td class="omit">{{item.remark}}</td>
                </tr>
              </tbody>
          </table>
          </div>
<!-- ---------------------- -->
            <div class=" d-flex justify-content-between align-items-center" v-if="results.sheet&&results.sheet.ban.length>0">
              <div><span class="infoItem1">板材</span></div>
              <button class="btn btn-primary btn-sm" style="float:right" @click="down_ban=true" v-if="down_ban==false">导出</button>
              <button class="btn btn-info btn-sm" style="float:right" @click="toExcel_ban" v-if="down_ban==true">确定</button>
            </div>
            <div class="table-responsive" style="margin:10px 0;max-height:300px;overflow-y:scroll;display:block" v-if="results.sheet&&results.sheet.ban.length>0">
            <table class="table table-hover" style="width:100%" id="sheets_ban">
              <thead>
                <tr>
                  <th v-if="down_ban"><input type="checkbox" v-model="form_ban_all"></th>
                  <th>名称</th>
                  <th>编号前缀</th>
                  <th>编号</th>
                  <th>宽度(mm)</th>
                  <th>高度(mm)</th>
                  <th>数量(片)</th>
                  <th>单件面积(㎡)</th>
                  <th class="text-info">总面积(㎡)</th>
                  <th>加工图编号</th>
                  <th>备注</th> 
                </tr>
              </thead>
              <tbody >
                <tr v-for="(item,key) in results.sheet.ban" :key="key" @click="fakeB(item.pid,item.oid)">
                  <td v-show="down_ban"><input type="checkbox" :value="key" v-model="form_ban"  @click.stop></td>
                  <td class="omit">{{item.name}}</td>
                  <td class="omit">{{item.codehead}}</td>
                  <td class="omit">{{item.code}}</td>
                  <td class="omit">{{item.width}}</td>
                  <td class="omit">{{item.height}}</td>
                  <td class="omit">{{item.num}}</td>
                  <td class="omit">{{item.acreage}}</td>
                  <td class="omit text-info">{{(item.acreage*item.num).toFixed(3)}}</td>
                  <td class="omit">{{item.number}}</td>
                  <td class="omit">{{item.remark}}</td>
                </tr>
              </tbody>
          </table>
          </div>
<!-- ---------------------- -->
            <div class=" d-flex justify-content-between align-items-center" v-if="results.sheet&&results.sheet.jian.length>0">
              <div><span class="infoItem1">钢加工件</span></div>
              <button class="btn btn-primary btn-sm" style="float:right" @click="down_jian=true" v-if="down_jian==false">导出</button>
              <button class="btn btn-info btn-sm" style="float:right" @click="toExcel_jian" v-if="down_jian==true">确定</button>
            </div>
            <div class="table-responsive" style="margin:10px 0;max-height:300px;overflow-y:scroll;display:block" v-if="results.sheet&&results.sheet.jian.length>0">
            <table class="table table-hover" style="width:100%" id="sheets_jian">
              <thead>
                <tr>
                  <th v-show="down_jian"><input type="checkbox" v-model="form_jian_all"></th>
                  <th>名称</th>
                  <th>编号</th>
                  <th>表面处理方式</th>
                  <th>件数</th>
                  <th>单件重量</th>
                  <th class="text-info">总重</th>
                  <th>加工图编号</th>
                  <th>备注</th> 
                </tr>
              </thead>
              <tbody >
                <tr v-for="(item,key) in results.sheet.jian" :key="key" @click="fakeB(item.pid,item.oid)">
                  <td v-show="down_jian"><input type="checkbox" :value="key" v-model="form_jian"  @click.stop></td>
                  <td class="omit">{{item.name}}</td>
                  <td class="omit">{{item.code}}</td>
                  <td class="omit">{{item.dispose}}</td>
                  <td class="omit">{{item.num}}</td>
                  <td class="omit">{{item.weight}}</td>
                  <td class="omit text-info">{{(item.num*item.weight).toFixed(3)}}</td>
                  <td class="omit">{{item.number}}</td>
                  <td class="omit">{{item.remark}}</td>
                </tr>
              </tbody>
          </table>
          </div>
<!-- ---------------------- -->
            <div class=" d-flex justify-content-between align-items-center" v-if="results.sheet&&results.sheet.fu.length>0">
              <div><span class="infoItem1">辅助材料</span></div>
              <button class="btn btn-primary btn-sm" style="float:right" @click="down_fu=true" v-if="down_fu==false">导出</button>
              <button class="btn btn-info btn-sm" style="float:right" @click="toExcel_fu" v-if="down_fu==true">确定</button>
            </div>
            <div class="table-responsive" style="margin:10px 0;max-height:300px;overflow-y:scroll;display:block" v-if="results.sheet&&results.sheet.fu.length>0">
            <table class="table table-hover" style="width:100%" id="sheets_fu">
              <thead>
                <tr>
                  <th><input type="checkbox" v-model="form_fu_all" v-show="down_fu_all"></th>
                  <th>名称</th>
                  <th>规格</th>
                  <th>材质</th>
                  <th>单位</th>
                  <th>数量</th>
                  <th>品牌</th>
                  <th>备注</th>  
                </tr>
              </thead>
              <tbody >
                <tr v-for="(item,key) in results.sheet.fu" :key="key" @click="fakeB(item.pid,item.oid)">
                  <td v-show="down_fu"><input type="checkbox" :value="key" v-model="form_fu" @click.stop></td>
                  <td class="omit">{{item.name}}</td>
                  <td class="omit">{{item.standard}}</td>
                  <td class="omit">{{item.quality}}</td>
                  <td class="omit">{{item.unit}}</td>
                  <td class="omit">{{item.num}}</td>
                  <td class="omit">{{item.brand}}</td>
                  <td class="omit">{{item.remark}}</td>
                </tr>
              </tbody>
          </table>
          </div>


      </div>
    </div>


<!-- 模态框 -->
<div class="modal fade" id="config">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">修改订单信息</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
        <div class="form-group"  style="margin-top:20px">
            <label class="mulit">订单名称</label>
            <input type="text" class="form-control" value="XXX订单">
        </div>
        <div class="form-group">
            <label >位置</label>
            <input type="text" class="form-control" value="XXXXXXXXXX">
        </div>
        <div class="form-group">
            <label >送货地点</label>
            <input type="text" class="form-control" value="#XXXXXX">
        </div>
        <div class="form-group">
            <label>技术要求</label>
            <input type="text" class="form-control" value="EQWQDQWD">
        </div>
        <div class="form-group">
            <label>备注</label>
            <textarea class="form-control" rows="2" style="resize:none">2312131e</textarea>
        </div>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal">保存</button>
      </div>
 
    </div>
  </div>
</div>

<div class="modal fade" id="files">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">附件列表</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between"><span>XXX附件</span><span class="btn btn-info">下载</span></li>
            <li class="list-group-item d-flex justify-content-between"><span>XXX附件</span><span class="btn btn-info">下载</span></li>
            <li class="list-group-item d-flex justify-content-between"><span>XXX附件</span><span class="btn btn-info">下载</span></li>
        </ul>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
      </div>
 
    </div>
  </div>
</div>
<!-- ----- -->
  </div>
      </div>
  </div>
</template>

<script>
import {downExcel} from '../../config/mUtils.js';
import {LOADING_START,LOADING_END} from '../../store/mutation_types.js';
import {getGlobal} from '../../api/search.js';
export default{
  created(){
    this.text=this.$route.params.text;
    this.$store.commit(LOADING_END);
    this.init();
  },
  data(){
    return {
      form_lv_all:false,
      form_gang_all:false,
      form_ban_all:false,
      form_jian_all:false,
      form_fu_all:false,
      form_lv:[],
      form_gang:[],
      form_ban:[],
      form_jian:[],
      form_fu:[],
      down_lv:false,
      down_gang:false,
      down_ban:false,
      down_jian:false,
      down_fu:false,
        results:{},
        text:'',
        form:[]
      }
    },
  methods:{
    async init(){
      this.$store.commit(LOADING_START);
      let res=await getGlobal({text:this.text})
      if(res.data.res==0){alert(res.data.text);return};
      this.results=res.data.body;
      this.$store.commit(LOADING_END);
    },
    fakeA(pid){
      this.$router.push('/pro/'+pid+'/order')
    },
    fakeB(pid,oid){
      this.$router.push('/pro/'+pid+'/order/'+oid)
    },
    toExcel_lv(){
      let select=[];
      select[0]=[];
      let tableHead=$('#sheets_lv')[0].children[0].childNodes[0].children;
      for(let i=0;i<tableHead.length;i++){
        if(i>0){
          select[0].push(tableHead[i].innerText)
        }
      }
      $('#sheets_lv')[0].children[1].childNodes.forEach(item=>{
        if(item.firstChild.firstChild.checked){
          let arr=[];
          for(let key2=0;key2<item.children.length;key2++){
            let item2=item.children[key2];
            if(key2>0){
              arr.push(item2.innerText)
            }
          }
          select.push(arr)
        }
      })
      let tmpDown = downExcel(select);
      window.FileSaver.saveAs(tmpDown, "搜索结果下载.xlsx");
      this.down_lv=false;
    },
    toExcel_gang(){
      let select=[];
      select[0]=[];
      let tableHead=$('#sheets_gang')[0].children[0].childNodes[0].children;
      for(let i=0;i<tableHead.length;i++){
        if(i>0){
          select[0].push(tableHead[i].innerText)
        }
      }
      $('#sheets_gang')[0].children[1].childNodes.forEach(item=>{
        if(item.firstChild.firstChild.checked){
          let arr=[];
          for(let key2=0;key2<item.children.length;key2++){
            let item2=item.children[key2];
            if(key2>0){
              arr.push(item2.innerText)
            }
          }
          select.push(arr)
        }
      })
      let tmpDown = downExcel(select);
      window.FileSaver.saveAs(tmpDown, "搜索结果下载.xlsx");
      this.down_gang=false;
    },
    toExcel_ban(){
      let select=[];
      select[0]=[];
      let tableHead=$('#sheets_ban')[0].children[0].childNodes[0].children;
      for(let i=0;i<tableHead.length;i++){
        if(i>0){
          select[0].push(tableHead[i].innerText)
        }
      }
      $('#sheets_ban')[0].children[1].childNodes.forEach(item=>{
        if(item.firstChild.firstChild.checked){
          let arr=[];
          for(let key2=0;key2<item.children.length;key2++){
            let item2=item.children[key2];
            if(key2>0){
              arr.push(item2.innerText)
            }
          }
          select.push(arr)
        }
      })
      let tmpDown = downExcel(select);
      window.FileSaver.saveAs(tmpDown, "搜索结果下载.xlsx");
      this.down_ban=false;
    },
    toExcel_jian(){
      let select=[];
      select[0]=[];
      let tableHead=$('#sheets_jian')[0].children[0].childNodes[0].children;
      for(let i=0;i<tableHead.length;i++){
        if(i>0){
          select[0].push(tableHead[i].innerText)
        }
      }
      $('#sheets_jian')[0].children[1].childNodes.forEach(item=>{
        if(item.firstChild.firstChild.checked){
          let arr=[];
          for(let key2=0;key2<item.children.length;key2++){
            let item2=item.children[key2];
            if(key2>0){
              arr.push(item2.innerText)
            }
          }
          select.push(arr)
        }
      })
      let tmpDown = downExcel(select);
      window.FileSaver.saveAs(tmpDown, "搜索结果下载.xlsx");
      this.down_jian=false;
    },
    toExcel_fu(){
      let select=[];
      select[0]=[];
      let tableHead=$('#sheets_fu')[0].children[0].childNodes[0].children;
      for(let i=0;i<tableHead.length;i++){
        if(i>0){
          select[0].push(tableHead[i].innerText)
        }
      }
      $('#sheets_fu')[0].children[1].childNodes.forEach(item=>{
        if(item.firstChild.firstChild.checked){
          let arr=[];
          for(let key2=0;key2<item.children.length;key2++){
            let item2=item.children[key2];
            if(key2>0){
              arr.push(item2.innerText)
            }
          }
          select.push(arr)
        }
      })
      let tmpDown = downExcel(select);
      window.FileSaver.saveAs(tmpDown, "搜索结果下载.xlsx");
      this.down_fu=false;
    },
  },
  watch:{
    form_lv_all(newval,oldval){
      if(newval){
        this.form_lv=Object.keys(this.results.sheet.lv);
      }else{
        this.form_lv=[];
      }
    },
    form_gang_all(newval,oldval){
      if(newval){
        this.form_gang=Object.keys(this.results.sheet.gang);
      }else{
        this.form_gang=[];
      }
    },
    form_ban_all(newval,oldval){
      if(newval){
        this.form_ban=Object.keys(this.results.sheet.ban);
      }else{
        this.form_ban=[];
      }
    },
    form_jian_all(newval,oldval){
      if(newval){
        this.form_jian=Object.keys(this.results.sheet.jian);
      }else{
        this.form_jian=[];
      }
    },
    form_fu_all(newval,oldval){
      if(newval){
        this.form_fu=Object.keys(this.results.sheet.fu);
      }else{
        this.form_fu=[];
      }
    },

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
  .infoItem1::before{
    content:'';
    display: inline-block;
    margin-right: 5px;
    margin-left:10px;
    width: 10px;
    height:10px;
    border-radius: 50%;
    background-color:#66ccff
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
.func{
  button{
    font-size: 10px;
  }
}
.toprow{
  min-height: 400px;
  padding:0 5px;
  .bbox{
    background-color: #fff;
    margin-bottom:15px;
    padding:10px 20px;
  }
}
.table-responsive th{
  white-space: nowrap;
}
.step-box{
  font-size:12px;
  .stepp{
      max-width: 300px;
      margin: 0 auto;
  }
.step{
    background-color: #9d9d9d;
    color:#fff;
    position: relative;
    margin-right: 10px;
    padding:3px 0;
    min-width:60px
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
.table-responsive{
  text-align: center;
  th{
    white-space: nowrap;
  }
  tr{
    cursor: pointer;
    white-space: nowrap;
  }
}
</style>
