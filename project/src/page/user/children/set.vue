<template>
  <div class="row d-flex justify-content-center align-items-center">
    <div class="title"><i class="iconfont icon-edit"></i>修改资料</div>
    <div class="editBox">
      <div class="card">
        <div class="card-body">
          <div class="form-group">
            <label >账户:</label>
            <input type="text" class="form-control" disabled v-model="username">
          </div>
          <div class="form-group">
            <label >昵称:</label>
            <input type="text" class="form-control" v-model="nickname">
          </div>
          <div class="form-group">
            <label >手机号:</label>
            <input type="text" class="form-control" disabled v-model="phone">
          </div>
          <div class="form-group">
            <label >部门:</label>
            <input type="text" class="form-control" v-model="departments">
          </div>
          <span class="btn btn-success" @click="save">保存</span>
          <span class="btn btn-info" data-toggle="modal" data-target="#editPass">修改密码</span>
        </div>
      </div>
    </div>
<!-- 模态框 -->
<div class="modal fade" id="editPass">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">修改密码</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
          <div class="form-group">
            <label >旧密码:</label>
            <input type="password" class="form-control" v-model="oldPass">
          </div>
            <div class="form-group">
            <label >新密码:</label>
            <input type="password" class="form-control" v-model="newPass">
          </div>
            <div class="form-group">
            <label >确认密码:</label>
            <input type="password" class="form-control" v-model="newPass2">
          </div>
      </div>
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" @click="changePass">保存</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
      </div>
 
    </div>
  </div>
</div>


    <!-- -------------- -->
  </div>
</template>

<script>
import {LOGOUT} from '../../../store/mutation_types.js';
import {saveChange,changePass} from '../../../api/account.js';
export default {
  created(){
    this.init();
  },
  data(){
    return {
      id:'',
      username:'',
      nickname:'',
      phone:'',
      departments:'',
      oldPass:'',
      newPass:'',
      newPass2:''
    }
  },
  methods:{
    init(){
        this.id=this.$store.state.userInfo.id,
        this.username=this.$store.state.userInfo.username,
        this.nickname=this.$store.state.userInfo.nickname,
        this.phone=this.$store.state.userInfo.phone,
        this.departments=this.$store.state.userInfo.departments;
    },
    async save(){
      let info={
        id:this.id,
        username:this.username,
        nickname:this.nickname,
        phone:this.phone,
        departments:this.departments
      }
      let res=await saveChange(info);
      if(res.data.res==0){alert(res.data.text);return};
      this.$store.commit(LOGOUT)
      alert('修改成功，请重新登录')
      this.$router.push('/login')
    },
    async changePass(){
      if(this.newPass!=this.newPass2){alert('两次密码不一致');return};
      let res=await changePass({id:this.id,oldPass:this.oldPass,newPass:this.newPass});
      if(res.data.res==0){alert(res.data.text);return};
      this.$store.commit(LOGOUT)
      $('#editPass').modal('hide');
      alert('修改成功，请重新登录')
      this.$router.push('/login')
    }
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
  .editBox{
    width:100%;
    margin:10px 0;
    padding:10px 20px;
  }
}
</style>
