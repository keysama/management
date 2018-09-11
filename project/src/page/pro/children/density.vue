<template>
  <div class="row toprow align-content-start">
    <div class="col-md-12">
      <div class="col-md-12 text-left title d-flex justify-content-between align-items-center" style="margin-bottom:0">
        <h4>铝材线密度</h4>
        <div>
        <!-- <button class="btn btn-info btn-sm" style="position:relative" v-if="allowAddDensity" >
            <input type="file" style="position:absolute;top:0;left:0;width:100%;height:100%;opacity:0">
            从excel导入
        </button> -->
        <button class="btn btn-info btn-sm disabled" v-if="!allowAddDensity">添加</button>
        <button class="btn btn-info btn-sm" data-toggle="modal" data-target="#add" v-if="allowAddDensity">添加</button>
        </div>

      </div>
      <div style="background-color:#fff">
            <table class="table table-striped table-bordered table-hover">
                <thead>
                <tr>
                    <th>型材名称</th>
                    <th>型材代号</th>
                    <th>线密度</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,key) in rouList" :key="key" @click="delate(item.id)">
                    <td >{{item.name}}</td>
                    <td>{{item.code}}</td>
                    <td>{{item.rou}}</td>
                </tr>
                </tbody>
            </table>
      </div>
     
    </div>

 
<!-- 模态框 -->
<div class="modal fade" id="add">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">铝材线密度添加</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
<div class="form-group">
  <label >型材名称:</label>
  <input type="text" class="form-control" v-model="new_name">
</div>
<div class="form-group">
  <label >型材代号:</label>
  <input type="text" class="form-control" v-model="new_code">
</div>
<div class="form-group">
  <label >线密度:</label>
  <input type="text" class="form-control" v-model="new_rou">
</div>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" @click="addDensity">添加</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
      </div>

    </div>
  </div>
</div>

  </div>
</template>

<script>
import {checkPower} from '../../../api/pro.js';
import {LOADING_START,LOADING_END} from '../../../store/mutation_types.js';
import {add_density,list_density,delete_density} from '../../../api/density.js';
export default {
    created(){
      this.init();
    },
    data(){
      return {
        power:'',
        project:'',
        new_name:'',
        new_code:'',
        new_rou:'',
        rouList:[]
      }
    },
    methods:{
        async init(){
          this.$store.commit(LOADING_START);
          this.project=this.$route.params.id;
          let res1=await checkPower({id:this.$route.params.id})
          let res=await list_density({pid:this.project})
          this.$store.commit(LOADING_END);
          if(res.data.res==0){alert(res.data.text);return};
          this.power=res1.data.body;
          this.rouList=res.data.body;
        },
        async delate(id){
          if(!this.allowDeleteDensity && this.rouList.fliter(item=>item.id==id)[0].uid!=this.$store.state.userInfo.id){alert('此条记录只能由上传者、项目创建人、网站管理员删除');return}
          if(!confirm('确认删除？')){return;}
          this.$store.commit(LOADING_START);
          let res=await delete_density({density:id})
          this.$store.commit(LOADING_END);
          if(res.data.res==0){alert(res.data.text);return};
          this.init();
        },
        async addDensity(){
          this.$store.commit(LOADING_START);
          let res=await add_density({
            pid:this.project,
            name:this.new_name,
            code:this.new_code,
            rou:this.new_rou
          });
          this.$store.commit(LOADING_END);
          if(res.data.res==0){alert(res.data.text);return};
          this.init();
        }
    },
    computed:{
      allowAddDensity(){
        if(this.power===''){return false}
        return this.$store.state.jobList[this.power].indexOf(14)>=0 || this.$store.state.userInfo.type==0;
      },
      allowDeleteDensity(){
        if(this.power===''){return false}
        return this.$store.state.jobList[this.power].indexOf(24)>=0 || this.$store.state.userInfo.type==0;
      },
    }
}

</script>

<style scoped lang="less">
@import "../../../assets/css/theme.less";

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
