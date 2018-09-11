<template>
<div class="row">
    <div class="col-md-4 offset-md-4">
         <h5 class="text-center title">③ 材料汇总</h5>
        <div class="d-flex justify-content-between" style="margin-bottom:20px">
            <label style="padding-top:5px" class=" w-50 text-center">名称:</label>
            <input type="text" class="form-control w-50" placeholder="对方手机号/昵称">
        </div>
        <div class="d-flex flex-wrap justify-content-between" style="margin-bottom:20px">
            <label style="padding-top:5px" class="w-50 text-center">数量:</label>
            <input type="text" class="form-control w-50" placeholder="对方手机号/昵称">
        </div>
       <div class="d-flex flex-wrap justify-content-between" style="margin-bottom:20px">
            <label style="padding-top:5px" class="w-50 text-center">总量:</label>
            <input type="text" class="form-control w-50" placeholder="对方手机号/昵称">
        </div>
        <div class="d-flex flex-wrap justify-content-center" style="margin-bottom:20px">
             <button type="button" class="btn btn-primary w-50">添加</button>
        </div>
    </div>
    <div class="col-md-6 offset-md-3">
           <table class="table table-bordered table-hover">
                <thead>
                <tr>
                    <th>名称</th>
                    <th>数量</th>
                    <th>总量</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>John</td>
                    <td>Doe</td>
                    <td>john@example.com</td>
                </tr>
                <tr>
                    <td>Mary</td>
                    <td>Moe</td>
                    <td>mary@example.com</td>
                </tr>
                <tr>
                    <td>July</td>
                    <td>Dooley</td>
                    <td>july@example.com</td>
                </tr>
                </tbody>
            </table>
    </div>
    <div class="col-md-4 offset-md-4">
        <div class="controller">
             <router-link to="/addPro/step2" class="btn btn-outline-primary w-40">上一步</router-link>
             <button type="button" class="btn btn-outline-primary w-40">完成</button>
        </div> 
    </div>
 
</div>
</template>

<script>

</script>
<style lang="less" scoped>
@import "../../../assets/css/theme.less";
.row{
    padding:10px;
    .box{
        min-height:400px;
    }
}
.controller{
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    .btn:nth-child(1){
        width: 30%
    }
    .btn:nth-child(2){
        width: 68%
    }
}
.title{
    font-size: .8rem;
    font-weight: 600;
}
</style>
