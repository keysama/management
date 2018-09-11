<template>
  <div class="row">
      <div class="col-md-12 d-flex justify-content-between align-items-center title">
        <div><i class="iconfont icon-gongchengliebiao" style="font-size:1.5rem">创建订单</i></div>
      </div>
      <router-view></router-view>

  </div>
</template>

<script>

</script>

<style scoped lang="less">
@import "../../assets/css/theme.less";
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
</style>