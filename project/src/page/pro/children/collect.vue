<template>
  <div class="row align-content-start">
      <div class="col-md-12 d-flex justify-content-between title">
        <h4><i class="iconfont icon-yuancailiaotongjihuizong" style="font-size:1.5rem">材料汇总</i></h4>
        <div class="d-flex justify-content-center" style="flex-direction:column" v-if="!edit"><span  class="btn btn-info pointer" style="font-size:10px;padding:5px" @click="edit=true"><i class="iconfont icon-edit" style="font-size:10px"> 编辑</i></span></div>
        <div class="d-flex justify-content-center" style="flex-direction:column" v-if="edit"><span  class="btn btn-success pointer" style="font-size:10px;padding:5px" @click="saveYuji"><i class="iconfont icon-edit" style="font-size:10px" >保存</i></span></div>
      </div>
      <ul class="list-group w-100">
                <li class="list-group-item pointer d-flex justify-content-between" data-toggle="collapse" data-target="#1">
                  <span>铝型材</span>
                  <span  class="badge badge-light pointer" style="padding:5px">
                    <span class="badge badge-light" style=";margin-right:10px">预计:<span class="text-info">{{yuji_lv.toFixed(3)}}</span>|提料:<span class="text-primary">{{total.lv?total.lv.totle.toFixed(3):'...'}}</span>|到货:<span class="text-success">{{total.lv?total.lv.finish.toFixed(3):'...'}}</span></span>
                    <!-- <i class="iconfont icon-icon10" style="font-size:10px">添加</i> -->
                  </span>
                </li>
                <div id="1" class="collapse" style="padding:10px;background-color:#ececec">
                  <table class="table table-bordered" >
                    <tr>
                      <td>
                        <div class="text-center" style="width:100%" >预计用量</div>
                        <input type="text" class="form-control" :disabled="true" :value="yuji_lv">
                      </td>
                      <td>
                        <div class="text-center" style="width:100%">提料总量</div>
                        <input type="text" class="form-control" disabled :value="total.lv?total.lv.totle.toFixed(3):'...'">
                      </td>
                      <td>
                        <div class="text-center" style="width:100%">到货总量</div>
                        <input type="text" class="form-control" disabled :value="total.lv?total.lv.finish.toFixed(3):'...'">
                      </td>
                    </tr>
                  </table>
                  <div class="table-responsive">
                    <table class="table table-bordered" style="background-color:#fff">
                        <thead>
                          <tr>
                            <th>名称</th>
                            <th>型材代号</th>
                            <th>提料数量</th>
                            <th>到货数量</th>
                            <th>预计</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,key) in total.lv.list" :key="key">
                            <td>{{item.name}}</td>
                            <td>{{item.code}}</td>
                            <td><input type="number" class="form-control" disabled :value="parseFloat(item.total).toFixed(3)"></td>
                            <td><input type="number" class="form-control" disabled :value="parseFloat(item.finish).toFixed(3)"></td>
                            <td><input type="number" class="form-control" v-model="item.yuji" :disabled="!edit" step="0.001"></td>
                          </tr>
                        </tbody>
                    </table>
                  </div>
                </div>
                <li class="list-group-item pointer d-flex justify-content-between" data-toggle="collapse" data-target="#2">
                  <span>钢型材</span>
                  <span  class="badge badge-light pointer" style="padding:5px">
                <span class="badge badge-light" style=";margin-right:10px">预计:<span class="text-info">{{yuji_gang.toFixed(3)}}</span>|提料:<span class="text-primary">{{total.gang?total.gang.totle.toFixed(3):'...'}}</span>|到货:<span class="text-success">{{total.gang?total.gang.finish.toFixed(3):'...'}}</span></span>
                    <!-- <i class="iconfont icon-icon10" style="font-size:10px">添加</i> -->
                  </span>
                </li>
                <div id="2" class="collapse" style="padding:10px;background-color:#ececec">

                   <table class="table table-bordered">
                    <tr>
                      <td>
                        <div class="text-center" style="width:100%">预计用量</div>
                        <input type="text" class="form-control" :disabled="true" :value="yuji_gang.toFixed(3)">
                      </td>
                      <td>
                        <div class="text-center" style="width:100%">提料总量</div>
                        <input type="text" class="form-control" disabled :value="total.gang?total.gang.totle.toFixed(3):'...'">
                      </td>
                      <td>
                        <div class="text-center" style="width:100%">到货总量</div>
                        <input type="text" class="form-control" disabled :value="total.gang?total.gang.finish.toFixed(3):'...'">
                      </td>
                    </tr>
                  </table>
                  <div class="table-responsive">
                    <table class="table table-bordered" style="background-color:#fff">
                        <thead>
                          <tr>
                            <th>名称</th>
                            <th>规格</th>
                            <th>提料数量</th>
                            <th>到货数量</th>
                            <th>预计</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,key) in total.gang.list" :key="key">
                            <td>{{item.name}}</td>
                            <td>{{item.standard}}</td>
                            <td><input type="number" class="form-control" disabled :value="parseFloat(item.total).toFixed(3)"></td>
                            <td><input type="number" class="form-control" disabled :value="parseFloat(item.finish).toFixed(3)"></td>
                            <td><input type="number" class="form-control" v-model="item.yuji" :disabled="!edit" step="0.001"></td>
                          </tr>
                        </tbody>
                    </table>
                  </div>

                </div>
                <li class="list-group-item pointer d-flex justify-content-between" data-toggle="collapse" data-target="#3">
                  <span>板材</span>
                  <span  class="badge badge-light pointer" style="padding:5px">
                    <span class="badge badge-light" style=";margin-right:10px">预计:<span class="text-info">{{yuji_ban.toFixed(3)}}</span>|提料:<span class="text-primary">{{total.ban?total.ban.totle.toFixed(3):'...'}}</span>|到货:<span class="text-success">{{total.ban?total.ban.finish.toFixed(3):'...'}}</span></span>
                    <!-- <i class="iconfont icon-icon10" style="font-size:10px">添加</i> -->
                  </span>
                </li>
                <div id="3" class="collapse" style="padding:10px;background-color:#ececec">

                   <table class="table table-bordered">
                    <tr>
                      <td>
                        <div class="text-center" style="width:100%">预计用量</div>
                        <input type="text" class="form-control" disabled :value="yuji_ban.toFixed(3)">
                      </td>
                      <td>
                        <div class="text-center" style="width:100%">提料总量</div>
                        <input type="text" class="form-control" disabled :value="total.ban?total.ban.totle.toFixed(3):'...'">
                      </td>
                      <td>
                        <div class="text-center" style="width:100%">到货总量</div>
                        <input type="text" class="form-control" disabled :value="total.ban?total.ban.finish.toFixed(3):'...'">
                      </td>
                    </tr>
                  </table>
                  <div class="table-responsive">
                    <table class="table table-bordered" style="background-color:#fff">
                        <thead>
                          <tr>
                            <th>名称</th>
                            <th>编号前缀</th>
                            <th>编号</th>
                            <th>提料数量</th>
                            <th>到货数量</th>
                            <th>预计</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,key) in total.ban.list" :key="key">
                            <td>{{item.name}}</td>
                            <td>{{item.codehead=='null'?'':item.codehead}}</td>
                            <td>{{item.code}}</td>
                            <td><input type="number" class="form-control" disabled :value="parseFloat(item.total).toFixed(3)"></td>
                            <td><input type="number" class="form-control" disabled :value="parseFloat(item.finish).toFixed(3)"></td>
                            <td><input type="number" class="form-control" :disabled="!edit" v-model="item.yuji" step="0.001"></td>
                          </tr>
                        </tbody>
                    </table>
                  </div>

                </div>
                <li class="list-group-item pointer d-flex justify-content-between" data-toggle="collapse" data-target="#4">
                  <span>钢加工件</span>
                  <span  class="badge badge-light pointer" style="padding:5px">
                    <span class="badge badge-light" style=";margin-right:10px">预计:<span class="text-info">{{yuji_jian.toFixed(3)}}</span>|提料:<span class="text-primary">{{total.jian?total.jian.totle.toFixed(3):'...'}}</span>|到货:<span class="text-success">{{total.jian?total.jian.finish.toFixed(3):'...'}}</span></span>
                    <!-- <i class="iconfont icon-icon10" style="font-size:10px">添加</i> -->
                  </span>
                </li>
                <div id="4" class="collapse" style="padding:10px;background-color:#ececec">
                    
                   <table class="table table-bordered">
                    <tr>
                      <td>
                        <div class="text-center" style="width:100%">预计用量</div>
                        <input type="text" class="form-control" disabled :value="yuji_jian.toFixed(3)">
                      </td>
                      <td>
                        <div class="text-center" style="width:100%">提料总量</div>
                        <input type="text" class="form-control" disabled :value="total.jian?total.jian.totle.toFixed(3):0">
                      </td>
                      <td>
                        <div class="text-center" style="width:100%">到货总量</div>
                        <input type="text" class="form-control" disabled :value="total.jian?total.jian.finish.toFixed(3):0">
                      </td>
                    </tr>
                  </table>
                  <div class="table-responsive">
                    <table class="table table-bordered" style="background-color:#fff">
                        <thead>
                          <tr>
                            <th>名称</th>
                            <th>编号</th>
                            <th>提料数量</th>
                            <th>到货数量</th>
                            <th>预计</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(item,key) in total.jian.list" :key="key">
                            <td>{{item.name}}</td>
                            <td>{{item.code}}</td>
                            <td><input type="number" class="form-control" disabled :value="parseFloat(item.total).toFixed(3)"></td>
                            <td><input type="number" class="form-control" disabled :value="parseFloat(item.finish).toFixed(3)"></td>
                            <td><input type="number" class="form-control" :disabled="!edit" v-model="item.yuji" step="0.001"></td>
                          </tr>
                        </tbody>
                    </table>
                  </div>
                </div> 
                <!-- <li class="list-group-item pointer d-flex justify-content-between" data-toggle="collapse" data-target="#3">
                  <span>板材</span>
                  <span  class="badge badge-light pointer" style="padding:5px"><i class="iconfont icon-icon10" style="font-size:10px">添加</i></span>
                </li>
                <div id="3" class="collapse" style="padding:10px;background-color:#ececec">
                 <ul class="list-group">
                    <li class="list-group-item list-group-item-info pointer d-flex justify-content-between" @click="collapse('0_0')">
                      <div>玻璃</div>
                      <span class="badge badge-light pointer ">
                        <span class="badge badge-light" style="font-size:10px">预计:500|提料:{{total.ban.totle}}|到货:{{total.ban.finish}}</span>
                        <i class="iconfont icon-icon10" style="font-size:10px">添加</i>
                      </span>
                    </li>
                    <div id="0_0" class="collapse" style="padding:10px;background-color:#fff">
                         <table class="table table-bordered" style="background-color:#ececec">
                          <tr>
                            <td>
                              <div class="text-center" style="width:100%">预计用量</div>
                              <input type="text" class="form-control">
                            </td>
                            <td>
                              <div class="text-center" style="width:100%">提料总量</div>
                              <input type="text" class="form-control" disabled>
                            </td>
                            <td>
                              <div class="text-center" style="width:100%">到货总量</div>
                              <input type="text" class="form-control" disabled>
                            </td>
                          </tr>
                        </table>
<div class="table-responsive">
  <table class="table table-bordered" style="background-color:#fff">
      <thead>
        <tr>
          <th>名称</th>
          <th>预计用量</th>
          <th>提料数量</th>
          <th>到货数量</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>玻璃6+12+6</td>
          <td><input type="number" class="form-control" ></td>
          <td><input type="number" class="form-control" disabled></td>
          <td><input type="number" class="form-control" disabled></td>
        </tr>
        <tr>
          <td>玻璃8+12+8</td>
          <td><input type="number" class="form-control" ></td>
          <td><input type="number" class="form-control" disabled></td>
          <td><input type="number" class="form-control" disabled></td>
        </tr>
        <tr>
          <td>彩釉玻璃6+12+6</td>
          <td><input type="number" class="form-control" ></td>
          <td><input type="number" class="form-control" disabled></td>
          <td><input type="number" class="form-control" disabled></td>
        </tr>
      </tbody>
  </table>
</div>
                    </div>

                    <li class="list-group-item list-group-item-info pointer d-flex justify-content-between" @click="collapse('0_1')">
                      <div>石材</div>
                      <span class="badge badge-light pointer ">
                        <span class="badge badge-light" style="font-size:10px">预计:500|提料:200|到货:120</span>
                        <i class="iconfont icon-icon10" style="font-size:10px">添加</i>
                      </span>
                      </li>
                    <div id="0_1" class="collapse" style="padding:10px;background-color:#ffffff">

                         <table class="table table-bordered" style="background-color:#ececec">
                          <tr>
                            <td>
                              <div class="text-center" style="width:100%">预计用量</div>
                              <input type="text" class="form-control">
                            </td>
                            <td>
                              <div class="text-center" style="width:100%">提料总量</div>
                              <input type="text" class="form-control" disabled>
                            </td>
                            <td>
                              <div class="text-center" style="width:100%">到货总量</div>
                              <input type="text" class="form-control" disabled>
                            </td>
                          </tr>
                        </table>
<div class="table-responsive">
  <table class="table table-bordered" style="background-color:#fff">
      <thead>
        <tr>
          <th>名称</th>
          <th>预计用量</th>
          <th>提料数量</th>
          <th>到货数量</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>黄金麻25mm</td>
          <td><input type="number" class="form-control" ></td>
          <td><input type="number" class="form-control" disabled></td>
          <td><input type="number" class="form-control" disabled></td>
        </tr>
        <tr>
          <td>卡拉麦丽金30mm</td>
          <td><input type="number" class="form-control" ></td>
          <td><input type="number" class="form-control" disabled></td>
          <td><input type="number" class="form-control" disabled></td>
        </tr>
      </tbody>
  </table>
</div>
                    </div>

                    <li class="list-group-item list-group-item-info pointer d-flex justify-content-between" @click="collapse('0_2')">
                      <div>玻璃</div>
                      <span class="badge badge-light pointer ">
                        <span class="badge badge-light" style="font-size:10px">预计:500|提料:200|到货:120</span>
                        <i class="iconfont icon-icon10" style="font-size:10px">添加</i>
                      </span>
                    </li>
                    <div id="0_2" class="collapse" style="padding:10px;background-color:#fff">

                         <table class="table table-bordered" style="background-color:#ececec">
                          <tr>
                            <td>
                              <div class="text-center" style="width:100%">预计用量</div>
                              <input type="text" class="form-control">
                            </td>
                            <td>
                              <div class="text-center" style="width:100%">提料总量</div>
                              <input type="text" class="form-control" disabled>
                            </td>
                            <td>
                              <div class="text-center" style="width:100%">到货总量</div>
                              <input type="text" class="form-control" disabled>
                            </td>
                          </tr>
                        </table>
                        <table class="table table-bordered" style="background-color:#fff">
                            <thead>
                              <tr>
                                <th>名称</th>
                                <th>提料数量</th>
                                <th>到货数量</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>铝单板2.5mm</td>
                                <td><input type="number" class="form-control" disabled></td>
                                <td><input type="number" class="form-control" disabled></td>
                              </tr>
                              <tr>
                                <td>铝单板3mm</td>
                                <td><input type="number" class="form-control" disabled></td>
                                <td><input type="number" class="form-control" disabled></td>
                              </tr>
                            </tbody>
                        </table> -->
                        <div class="table-responsive">
<!-- <table class="table table-bordered" style="background-color:#fff;">
    <thead>
        <tr>
          <th>名称</th>
          <th>预计用量</th>
          <th>提料数量</th>
          <th>到货数量</th>
        </tr>
    </thead>
    <tbody>
      <tr>
        <td>铝单板2.5mm</td>
        <td><input type="number" class="form-control" ></td>
        <td><input type="number" class="form-control" disabled></td>
        <td><input type="number" class="form-control" disabled></td>
      </tr>
      <tr>
        <td>铝单板3mm</td>
        <td><input type="number" class="form-control" ></td>
        <td><input type="number" class="form-control" disabled></td>
        <td><input type="number" class="form-control" disabled></td>
      </tr>
    </tbody>
</table>
                      </div> -->
                    <!-- </div> -->

                       <!-- </ul> -->
                </div>
    </ul>   
  </div>
</template>

<script>
import {getTotal,setYuji} from '../../../api/collect.js';
import {LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
export default {
  created(){
    this.init();
  },
  data(){
    return{
      edit:false,
      total:{
        lv:{totle:0,finish:0,list:[]},
        gang:{totle:0,finish:0,list:[]},
        ban:{totle:0,finish:0,list:[]},
        jian:{totle:0,finish:0,list:[]}
      }
    }
  },
  methods:{
    async init(){
      this.$store.commit(LOADING_START);
      let res=await getTotal({pro:this.$route.params.id});
      this.$store.commit(LOADING_END);
      if(res.data.res==0){alert(res.data.text);return};
      this.total=res.data.body;
    },
    collapse(r){
      $('#'+r).toggle();
    },
    async saveYuji(){
      this.$store.commit(LOADING_START);
      this.edit=false;
      let res=await setYuji({total:this.total,pid:this.$route.params.id});
      this.$store.commit(LOADING_END);
      if(res.data.res==0){alert(res.data.text);return};
      this.init();
    }
  },
  computed:{
    yuji_lv(){
      return this.total.lv.list.reduce(function(total,item){
       return parseFloat(total)+parseFloat(item.yuji)
      },0)
    },
    yuji_gang(){
      return this.total.gang.list.reduce(function(total,item){
        return parseFloat(total)+parseFloat(item.yuji)
      },0)
    },
    yuji_ban(){
      return this.total.ban.list.reduce(function(total,item){
        return total+parseFloat(item.yuji)
      },0)
    },
    yuji_jian(){
      return this.total.jian.list.reduce(function(total,item){
        return total+parseFloat(item.yuji)
      },0)
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

table{
  white-space:nowrap
}

</style>