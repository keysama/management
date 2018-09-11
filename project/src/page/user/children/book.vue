<template>
  <div class="row yop align-content-start top">
    <div class="col-md-12 d-flex justify-content-between align-items-center" style="border-bottom:1px solid #ececec;margin-bottom:20px;padding:0 15px;background-color:#fff">
      <h5 style="margin:10px;"><i class="iconfont icon-lianxiren1" style="margin-right:10px"></i>联系人列表</h5>
      <div>
        <button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown">
          添加
        </button>
        <div class="dropdown-menu">
          <button type="button" class="dropdown-item" data-toggle="modal" data-target="#addGroup">
            添加分组
          </button>
          <button type="button" class="dropdown-item" data-toggle="modal" data-target="#addBook">
            添加联系人
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-12">
        <ul class="list-group book">
          <li class="list-group-item pointer" data-toggle="collapse" :data-target="key" v-for="(item,key) in book" :key="key" :ref="key"  @click="collapse(key)">
            {{item.name}}
            <span class="badge badge-pill badge-info" >{{item.member.length}}</span>
            <!-- <span class="delete">&times;</span> -->
            <div :id="key" class="collapse">
                <ul class="list-group">
                  <li class="list-group-item man" :class="{'list-group-item-success':item2.state==1,'list-group-item-info':item2.state==0}" v-for="(item2,key2) in item.member" :key="key2" @click.stop="active">
                    {{item2.nickname}}【{{item2.departments}}】
                    <span class="badge badge-pill badge-default" >{{item2.state==1?'互相添加':'单向添加'}}</span>
                    <span class="delete">&times;</span>
                  </li>
                </ul>
            </div>
          </li>
        </ul>
    </div>
    <!-- ---------------- -->
                <div class="modal fade" id="addBook">
                  <div class="modal-dialog">
                    <div class="modal-content">
                
                      <!-- 模态框头部 -->
                      <div class="modal-header">
                        <h4 class="modal-title">添加联系人</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                      </div>
                
                      <!-- 模态框主体 -->
                      <div class="modal-body">
                          <div class="d-flex justify-content-center">
                              <select class="form-control w-30" aria-placeholder="选择分组" autocomplete="none" v-model="add_book">
                                <option v-for="(item,key) in book" :key="key" :value="item.id">{{item.name}}</option>
                              </select>
                              <input type="text" class="form-control" placeholder="对方手机号/昵称" v-model="add_user">
                              <button type="button" class="btn btn-info" style="margin-left:10px" @click="addMember">添加</button>
                          </div>
                      </div>
                      <!-- 模态框底部 -->
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                      </div>
                
                    </div>
                  </div>
                </div>
<!-- ---------------- -->
 <div class="modal fade" id="addGroup">
                  <div class="modal-dialog">
                    <div class="modal-content">
                
                      <!-- 模态框头部 -->
                      <div class="modal-header">
                        <h4 class="modal-title">添加分组</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                      </div>
                
                      <!-- 模态框主体 -->
                      <div class="modal-body">
                          <div class="d-flex justify-content-center">
                              <input type="text" class="form-control" placeholder="输入分组名" v-model="newBook">
                              <button type="button" class="btn btn-info" style="margin-left:10px" @click="addBook">添加</button>
                          </div>
                      </div>
                      <!-- 模态框底部 -->
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                      </div>
                
                    </div>
                  </div>
                </div>

  </div>
</template>

<script>
import {add_book,get_book,add_member} from '../../../api/book.js';
export default {
    created(){
      this.init();
    },
    data(){
      return {
        newBook:'',//模态框输入的分组名
        book:'',//联系人列表
        add_book:'',//模态框添加联系人选择的分组名
        add_user:''//模态框添加联系人输入的账号
      }
    },
    methods:{
      async addBook(){
        if(this.newBook==''){alert('分组名不能为空！');return}
        if(this.book.filter(item=>item.name==this.newBook && this.newBook!='').length>0){alert('分组名已存在！');return}
        let res=await add_book({name:this.newBook});
        if(res.data.res!=1){alert(res.data.text)};
        $('#addGroup').modal('hide');
        this.init();
      },
      async init(){
        let book=await get_book();
        if(book.data.res!=1){alert(book.data.text)};
        this.newBook='';
        this.book=book.data.body;
        this.add_book=this.book[0].id;
      },
      async addMember(){
        if(this.add_book=='' || this.add_user==''){alert('信息不完整');return};
        let res=await add_member({book:this.add_book,member:this.add_user});
        if(res.data.res!=1){alert(res.data.text);return};
        this.init();
        this.add_book='';
        this.add_user='';
        $('#addBook').modal('hide');
      },
      collapse(r){
        $('#'+r).toggle();
      },
      active(){
        alert('ok')
      }
    },
}
</script>

<style scoped lang="less">
@import "../../../assets/css/theme.less";
.yop{
  width:100%;
   min-height: 400px;
   padding:10px;
   margin:0;
}

// .top ::before{
//   content: "";
//   height:100%;
//   width: 5px;
//   position: absolute;
//   left:-5px;
//   background-color: @cut3;
//   top:0;
// }
.btn-primary{
  background-color: @cut3;
}
.badge{
  margin-left: 10px !important;
}
.delete{
  position: absolute;
  right:10px;
  top:10px;
}
</style>
