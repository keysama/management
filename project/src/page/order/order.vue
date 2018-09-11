<template>
  <div class="row toprow align-content-start">
    <div class="col-md-12">
      <div class="col-md-12 text-left title d-flex justify-content-between align-items-center" >
        <h4 style="word-break:break-all"><span v-if="order.type==0">({{all_num || 0}}支,{{all_weight?all_weight.toFixed(3):0}}Kg)</span><br class="hidden-md" />{{order.title}}</h4>
        <h4 style="text-align:center">
          <span class="badge" style="margin-right:10px" :class="{'badge-secondary':(state==0||state==3),'badge-info':(state==1||state==4),'badge-danger':(state==2||state==5),'badge-success':state==6}">{{state_words}}</span>
          <br class="hidden-md" />
          <span class="btn btn-info btn-sm" @click="export_excel">导出</span>
        </h4>
      </div>
      <div class="col-md-12 title d-flex justify-content-between align-items-center bg-info" style="margin-bottom:0" v-if="allow_check && state!=6">
				<span class="text-white">审核操作({{(order.processing && order.processing!='')?order.processing.split(';')[2]:'' | timeFilter}})</span>
        <div>
          <span class="btn btn-success" @click="sendAllow">通过</span>
          <span class="btn btn-danger" @click="sendBack">退回</span>
        </div>
			</div>
      <div class="col-md-12 box title">
        <div class="font-weight-bold" style="border-bottom:3px solid #ececec">基本信息</div>
        <div class="row infoList" style="padding-top:5px">
         <div class="col-md-6 infoItem">类型:{{order.type | typeFilter}}</div>
           <div class="col-md-6 infoItem" data-toggle="modal" data-target="#files">附件数:{{order.fileList?order.fileList.length:''}}</div>
           <div class="col-md-6 infoItem">订单编号:#{{order.id}}</div>
          <div class="col-md-6 infoItem">创建人:{{order.holder?order.holder.nickname:''}}</div>
          <div class="col-md-6 infoItem">创建时间:{{order.timestemp | timeFilter}}</div>
        </div>
      </div>
      <div class="col-md-12 box title">
        <div class="font-weight-bold d-flex justify-content-between align-items-center" style="border-bottom:3px solid #ececec">
          <div>提料概况<i class="iconfont icon-edit" style="margin-left:10px;cursor:pointer" data-toggle="modal" data-target="#config" v-if="allow_editeOrder"></i></div> 
          <div><button class="btn btn-success btn-sm" style="margin-right:10px;margin-bottom:10px" data-toggle="modal" data-target="#files">附件</button></div>
        </div>
        <div class="row infoList" style="padding-top:5px">
           <div class="col-md-6 infoItem">订单名称:{{order.title}}</div>
          <div class="col-md-6 infoItem">位置:{{order.position}}</div>
          <div class="col-md-6 infoItem">送货地点:{{order.target_position}}</div>
          <div class="col-md-6 infoItem">技术要求:{{order.specifications}}</div>
          <div class="col-md-6 infoItem">备注:{{order.remark}}</div>
         
        </div>
      </div>
      <div class="col-md-12 title d-flex justify-content-between" style="margin-bottom:0">
				<h4>提料列表</h4>
				<div>
          <span class="btn btn-primary btn-sm disabled" v-if="!allow_addSheet">添加</span>
					<span class="btn btn-primary btn-sm" data-toggle="modal" data-target="#addSheet" v-if="allow_addSheet">添加</span>
					<span class="btn btn-info btn-sm" v-if="allow_addSheet" style="position:relative">
            <input type="file" @change="addSheet_exc" style="left:0;top:0;position:absolute;width:100%;height:100%;opacity:0">
            从excel导入
          </span>
          <span class="btn btn-info btn-sm disabled" v-if="!allow_addSheet">从excel导入</span>
				</div>
			</div>
<!-- ----铝型材---- -->
      <div class="col-md-12 box" v-if="order.type==0">
          <div class="table-responsive table-hover">
          <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>名称</th>
                  <th>型材代号</th>
                  <th>材质</th>
                  <th>表面喷涂处理</th>
                  <th>喷涂色号</th>
                  <th>长度(m)</th>
                  <th>数量(支)</th>
                  <th>线密度(kg/m)</th>
                  <th class="text-info">每支重量(kg)</th>
                  <th class="text-info">总重(kg)</th>
                  <th>备注</th>  
                  <th>操作</th> 
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,key) in order.sheetList" :key="key" data-toggle="tooltip" :title="item.name">
                  <td class="omit">{{key+1}}</td>
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
                  <td class="d-flex func">
                    <button class="btn btn-info" style="margin-right:5px" @click="sheetEdit(item.id)" data-toggle="modal" data-target="#sheetEdit" v-if="allow_editeSheet">修改</button>
                    <button class="btn btn-danger" @click="sheetDelete(item.id)" v-if="allow_deleteSheet">删除</button>
                  </td>
                </tr>
              </tbody>
          </table>
          </div>
      
      
   
      </div>
<!-- ---钢型材--- -->
      <div class="col-md-12 box" v-if="order.type==1">
          <div class="table-responsive table-hover">
          <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>名称</th>
                  <th>规格</th>
                  <th>材质</th>
                  <th>表面处理方式</th>
                  <th>长度(m)</th>
                  <th>数量(支)</th>
                  <th>线密度(kg/m)</th>
                  <th>每支重量</th>
                  <th class="text-info">总重</th>
                  <th>备注</th>  
                  <th>操作</th> 
         
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,key) in order.sheetList" :key="key" data-toggle="tooltip" :title="item.name">
                  <td class="omit">{{key+1}}</td>
                  <td class="omit">{{item.name}}</td>
                  <td class="omit">{{item.standard}}</td>
                  <td class="omit">{{item.quality}}</td>
                  <td class="omit">{{item.dispose}}</td>
                  <td class="omit">{{item.length}}</td>
                  <td class="omit">{{item.num}}</td>
                  <td class="omit">{{item.rou}}</td>
                  <td class="omit">{{(item.rou*item.length).toFixed(3)}}</td>
                  <td class="omit text-info">{{(item.rou*item.num*item.length).toFixed(3)}}</td>
                  <td class="omit">{{item.remark}}</td>
                  <td class="d-flex func">
                    <button class="btn btn-info" style="margin-right:5px" @click="sheetEdit(item.id)" data-toggle="modal" data-target="#sheetEdit" v-if="allow_editeSheet">修改</button>
                    <button class="btn btn-danger" @click="sheetDelete(item.id)" v-if="allow_deleteSheet">删除</button>
                  </td>
                </tr>
              </tbody>
          </table>
          </div>
      </div>
 <!-- -------板材----------    -->
      <div class="col-md-12 box" v-if="order.type==2">
          <div class="table-responsive table-hover">
          <table class="table">
              <thead>
                <tr>
                  <th>#</th>
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
                  <th>操作</th> 
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,key) in order.sheetList" :key="key" data-toggle="tooltip" :title="item.name">
                  <td class="omit">{{key+1}}</td>
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
                  <td class="d-flex func">
                    <button class="btn btn-info" style="margin-right:5px" @click="sheetEdit(item.id)" data-toggle="modal" data-target="#sheetEdit" v-if="allow_editeSheet">修改</button>
                    <button class="btn btn-danger" @click="sheetDelete(item.id)" v-if="allow_deleteSheet">删除</button>
                  </td>
                </tr>
              </tbody>
          </table>
          </div>
      
      
   
      </div>      
 <!-- ----钢加工件----   -->
       <div class="col-md-12 box" v-if="order.type==3">
          <div class="table-responsive table-hover">
          <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>名称</th>
                  <th>编号</th>
                  <th>表面处理方式</th>
                  <th>件数</th>
                  <th>单件重量</th>
                  <th class="text-info">总重</th>
                  <th>加工图编号</th>
                  <th>备注</th> 
                  <th>操作</th> 
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,key) in order.sheetList" :key="key" data-toggle="tooltip" :title="item.name">
                  <td class="omit">{{key+1}}</td>
                  <td class="omit">{{item.name}}</td>
                  <td class="omit">{{item.code}}</td>
                  <td class="omit">{{item.dispose}}</td>
                  <td class="omit">{{item.num}}</td>
                  <td class="omit">{{item.weight}}</td>
                  <td class="omit text-info">{{(item.num*item.weight).toFixed(3)}}</td>
                  <td class="omit">{{item.number}}</td>
                  <td class="omit">{{item.remark}}</td>
                  <td class="d-flex func">
                    <button class="btn btn-info" style="margin-right:5px" @click="sheetEdit(item.id)" data-toggle="modal" data-target="#sheetEdit" v-if="allow_editeSheet">修改</button>
                    <button class="btn btn-danger" @click="sheetDelete(item.id)" v-if="allow_deleteSheet">删除</button>
                  </td>
                </tr>
              </tbody>
          </table>
          </div>
      
      
   
      </div>
<!-- ----辅助材料---- -->
      <div class="col-md-12 box" v-if="order.type==4">
          <div class="table-responsive table-hover">
          <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>名称</th>
                  <th>规格</th>
                  <th>材质</th>
                  <th>单位</th>
                  <th>数量</th>
                  <th>品牌</th>
                  <th>备注</th>  
                  <th>操作</th> 
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,key) in order.sheetList" :key="key" data-toggle="tooltip" :title="item.name">
                  <td class="omit">{{key+1}}</td>
                  <td class="omit">{{item.name}}</td>
                  <td class="omit">{{item.standard}}</td>
                  <td class="omit">{{item.quality}}</td>
                  <td class="omit">{{item.unit}}</td>
                  <td class="omit">{{item.num}}</td>
                  <td class="omit">{{item.brand}}</td>
                  <td class="omit">{{item.remark}}</td>
                  <td class="d-flex func">
                    <button class="btn btn-info" style="margin-right:5px" @click="sheetEdit(item.id)" data-toggle="modal" data-target="#sheetEdit" v-if="allow_editeSheet">修改</button>
                    <button class="btn btn-danger" @click="sheetDelete(item.id)" v-if="allow_deleteSheet">删除</button>
                  </td>
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
            <input type="text" class="form-control" v-model="order.title">
        </div>
        <div class="form-group">
            <label >位置</label>
            <input type="text" class="form-control" v-model="order.position">
        </div>
        <div class="form-group">
            <label >送货地点</label>
            <input type="text" class="form-control" v-model="order.target_position">
        </div>
        <div class="form-group">
            <label>技术要求</label>
            <input type="text" class="form-control" v-model="order.specifications">
        </div>
        <div class="form-group">
            <label>备注</label>
            <textarea class="form-control" rows="2" style="resize:none" v-model="order.remark"></textarea>
        </div>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" @click="edit_handle">保存</button>
        <button type="button" class="btn btn-light" data-dismiss="modal">取消</button>
      </div>
 
    </div>
  </div>
</div>

<div class="modal fade" id="files">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">附件列表<span class="btn btn-info" style="margin-left:10px" @click="to_uploadFile">上传</span></h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(item,key) in order.fileList" :key="key">
              <span style="overflow: hidden;text-overflow:ellipsis;width: 70%;">{{item.name}}</span>
              <span class="btn btn-info" @click="download(files_url+item.name)">下载</span>
              <i class="iconfont icon-remove2" style="position:absolute;left:2px;top:2px" @click="delete_file(item.id)" v-if="allow_deleteFile"></i>
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
<!-- ----- -->

<!-- ----------提料单修改------------ -->

<!-- 模态框 -->
<div class="modal fade" id="sheetEdit">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">修改</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
                  <!-- ------铝型材--------- -->
          <div v-if="parseInt(order.type)==0">
            <h4>铝型材信息</h4>
              <div class="form-group">
                  <label class="mulit">名称</label>
                  <input type="text" class="form-control" v-model="edit_sheet.name">
              </div>
              <div class="form-group">
                  <label class="mulit">型材代号</label>
                  <input type="text" class="form-control" v-model="edit_sheet.code">
              </div>
              <div class="form-group">
                  <label >材质:</label>
                  <input type="text" class="form-control" v-model="edit_sheet.quality">
              </div>
              <div class="form-group">
                  <label class="mulit">表面喷涂处理:</label>
                  <input type="text" class="form-control" v-model="edit_sheet.dispose">
              </div>
              <div class="form-group">
                  <label class="mulit">喷涂色号:</label>
                  <input type="text" class="form-control" v-model="edit_sheet.color">
              </div>
              <div class="form-group">
                  <label class="mulit">长度(m):</label>
                  <input type="number" class="form-control" v-model="edit_sheet.length">
              </div>
              <div class="form-group">
                  <label class="mulit">数量(支):</label>
                  <input type="number" class="form-control" v-model="edit_sheet.num">
              </div>
              <div class="form-group">
                  <label >线密度:</label>
                  <input type="number" class="form-control" v-model="edit_sheet.rou">
              </div>
              <div class="form-group">
                  <label>备注</label>
                  <input type="text" class="form-control" v-model="edit_sheet.remark">
              </div>
          </div>
          <!-- ------钢型材--------- -->
          <div v-if="parseInt(order.type)==1">
            <h4>钢型材信息</h4>
            <div class="form-group">
                  <label class="mulit">名称</label>
                  <input type="text" class="form-control" v-model="edit_sheet.name">
              </div>
              <div class="form-group">
                  <label >规格:</label>
                  <input type="text" class="form-control" v-model="edit_sheet.standard">
              </div>
              <div class="form-group">
                  <label class="mulit">材质:</label>
                  <input type="text" class="form-control" v-model="edit_sheet.quality">
              </div>
              <div class="form-group">
                  <label class="mulit">表面处理方式:</label>
                  <input type="text" class="form-control" v-model="edit_sheet.dispose">
              </div>
              <div class="form-group">
                  <label class="mulit">长度(m):</label>
                  <input type="number" class="form-control" v-model="edit_sheet.length">
              </div>
              <div class="form-group">
                  <label class="mulit">数量(支):</label>
                  <input type="number" class="form-control" v-model="edit_sheet.num">
              </div>
              <div class="form-group">
                  <label class="mulit">线密度(kg/m):</label>
                  <input type="text" class="form-control" v-model="edit_sheet.rou">
              </div>
              <div class="form-group">
                  <label>备注</label>
                  <input type="text" class="form-control" v-model="edit_sheet.remark">
              </div>
          </div>
          <!-- ------板材--------- -->
          <div v-if="parseInt(order.type)==2">
            <h4>板材信息</h4>
            <div class="form-group">
                <label class="mulit">名称</label>
                <input type="text" class="form-control" v-model="edit_sheet.name">
            </div>
            <div class="form-group">
                <label >编号前缀:</label>
                <input type="text" class="form-control" v-model="edit_sheet.codehead">
            </div>
            <div class="form-group">
                <label class="mulit">编号:</label>
                <input type="text" class="form-control" v-model="edit_sheet.code">
            </div>
            <div class="form-group">
                <label class="mulit">宽度W(mm):</label>
              <input type="number" class="form-control" v-model="edit_sheet.width">
            </div>
            <div class="form-group">
                <label class="mulit">高度H(mm):</label>
                <input type="number" class="form-control" v-model="edit_sheet.height">
            </div>
            <div class="form-group">
                <label class="mulit">数量(片)</label>
                <input type="number" class="form-control" v-model="edit_sheet.num">
            </div>
            <div class="form-group">
                <label class="mulit">单件面积(㎡):</label>
                <input type="text" class="form-control" v-model="edit_sheet.acreage">
            </div>
            <div class="form-group">
                <label class="mulit">加工图编号:</label>
                <input type="text" class="form-control" v-model="edit_sheet.number">
            </div>
            <div class="form-group">
                <label>备注</label>
                <input type="text" class="form-control" v-model="edit_sheet.remark">
            </div>
          </div>
          <!-- ------钢加工件--------- -->
          <div v-if="parseInt(order.type)==3">
            <h4>钢加工件信息</h4>
            <div class="form-group">
                <label class="mulit">名称</label>
                <input type="text" class="form-control"  v-model="edit_sheet.name">
            </div>
            <div class="form-group">
                <label >编号:</label>
                <input type="text" class="form-control"  v-model="edit_sheet.code">
            </div>
            <div class="form-group">
                <label >表面处理方式:</label>
                <input type="text" class="form-control"  v-model="edit_sheet.dispose">
            </div>
            <div class="form-group">
                <label class="mulit">件数:</label>
                <input type="number" class="form-control"  v-model="edit_sheet.num">
            </div>
            <div class="form-group">
                <label class="mulit">单件重量:</label>
                <input type="number" class="form-control"  v-model="edit_sheet.weight">
            </div>
            <div class="form-group">
                <label class="mulit">加工图编号:</label>
                <input type="text" class="form-control"  v-model="edit_sheet.number">
            </div>
            <div class="form-group">
                <label>备注</label>
                <input type="text" class="form-control"  v-model="edit_sheet.remark">
            </div>
          </div>
          <!-- ------辅助材料--------- -->
          <div v-if="parseInt(order.type)==4">
            <h4>辅助材料信息</h4>
            <div class="form-group">
                <label class="mulit">名称</label>
                <input type="text" class="form-control" v-model="edit_sheet.name">
            </div>
            <div class="form-group">
                <label >规格:</label>
                <input type="text" class="form-control" v-model="edit_sheet.standard">
            </div>
            <div class="form-group">
                <label >材质:</label>F
                <input type="text" class="form-control" v-model="edit_sheet.quality">
            </div>
            <div class="form-group">
                <label class="mulit">单位:</label>
                <input type="text" class="form-control"  v-model="edit_sheet.unit">
            </div>
            <div class="form-group">
                <label class="mulit">数量:</label>
              <input type="number" class="form-control" v-model="edit_sheet.num">
            </div>
            <div class="form-group">
                <label>品牌:</label>
                <input type="text" class="form-control" v-model="edit_sheet.brand">
            </div>
            <div class="form-group">
                <label>备注</label>
                <input type="text" class="form-control" v-model="edit_sheet.remark">
            </div>
          </div>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" @click="editHandle">保存</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
      </div>
 
    </div>
  </div>
</div>


<!-- -----------添加提料单------------ -->

<!-- 模态框 -->
<div class="modal fade" id="addSheet">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">添加提料单</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
			<!-- --type=0-- -->
      <div class="modal-body" v-if="order.type==0">
				<div class="modal-body">
						<div class="form-group">
								<label class="mulit">名称</label>
								<input type="text" class="form-control" v-model.lazy="newSheet.name">
						</div>
						<div class="form-group">
								<label class="mulit">型材代号</label>
								<input type="text" class="form-control" v-model.lazy="newSheet.code">
						</div>
						<div class="form-group">
								<label >材质:</label>
								<input type="text" class="form-control" v-model.lazy="newSheet.quality">
						</div>
						<div class="form-group">
								<label class="mulit">表面喷涂处理:</label>
								<input type="text" class="form-control" v-model.lazy="newSheet.dispose" >
						</div>
						<div class="form-group">
								<label class="mulit">喷涂色号:</label>
								<input type="text" class="form-control" v-model.lazy="newSheet.color">
						</div>
						<div class="form-group">
								<label class="mulit">长度(m):</label>
								<input type="number" class="form-control" v-model.lazy="newSheet.length">
						</div>
						<div class="form-group">
								<label class="mulit">数量(支):</label>
								<input type="number" class="form-control" v-model.lazy="newSheet.num">
						</div>
						<div class="form-group">
								<label >线密度:</label>
								<input type="number" class="form-control" v-model.lazy="newSheet.rou">
						</div>
						<div class="form-group">
								<label>备注</label>
								<input type="text" class="form-control" v-model.lazy="newSheet.remark">
						</div>
					</div>
      </div>
			<!-- --type=1-- -->
      <div class="modal-body" v-if="order.type==1">
				<div class="modal-body">
							<div class="form-group">
									<label class="mulit">名称</label>
									<input type="text" class="form-control" v-model="newSheet.name">
							</div>
							<div class="form-group">
									<label >规格:</label>
									<input type="text" class="form-control" v-model="newSheet.standard">
							</div>
							<div class="form-group">
									<label class="mulit">材质:</label>
									<input type="text" class="form-control" v-model="newSheet.quality">
							</div>
							<div class="form-group">
									<label class="mulit">表面处理方式:</label>
									<input type="text" class="form-control" v-model="newSheet.dispose" >
							</div>
							<div class="form-group">
									<label class="mulit">长度(m):</label>
									<input type="number" class="form-control" v-model="newSheet.length">
							</div>
							<div class="form-group">
									<label class="mulit">数量(支):</label>
									<input type="number" class="form-control" v-model="newSheet.num">
							</div>
							<div class="form-group">
									<label class="mulit">线密度(kg/m):</label>
									<input type="text" class="form-control" v-model="newSheet.rou">
							</div>
							<div class="form-group">
									<label>备注</label>
									<input type="text" class="form-control" v-model="order.remark">
							</div>
					</div>
      </div>
			<!-- --type=2-- -->
      <div class="modal-body" v-if="order.type==2">
				<div class="modal-body">
						<div class="form-group">
            <label class="mulit">名称</label>
            <input type="text" class="form-control" v-model="newSheet.name">
        </div>
        <div class="form-group">
            <label >编号前缀:</label>
            <input type="text" class="form-control" v-model="newSheet.codehead">
        </div>
        <div class="form-group">
            <label class="mulit">编号:</label>
            <input type="text" class="form-control" v-model="newSheet.code">
        </div>
        <div class="form-group">
            <label class="mulit">宽度W(mm):</label>
           <input type="number" class="form-control" v-model="newSheet.width">
        </div>
        <div class="form-group">
            <label class="mulit">高度H(mm):</label>
            <input type="number" class="form-control" v-model="newSheet.height">
        </div>
        <div class="form-group">
            <label class="mulit">数量(片)</label>
            <input type="number" class="form-control" v-model="newSheet.num">
        </div>
        <div class="form-group">
            <label class="mulit">单件面积(㎡):</label>
            <input type="text" class="form-control" v-model="newSheet.acreage">
        </div>
        <div class="form-group">
            <label class="mulit">加工图编号:</label>
            <input type="text" class="form-control" v-model="newSheet.number">
        </div>
        <div class="form-group">
            <label>备注</label>
            <input type="text" class="form-control" v-model="newSheet.remark">
        </div>
					</div>
      </div>
						<!-- --type=3-- -->
      <div class="modal-body" v-if="order.type==3">
				<div class="modal-body">
					<div class="form-group">
            <label class="mulit">名称</label>
            <input type="text" class="form-control" v-model="newSheet.name">
        </div>
        <div class="form-group">
            <label >编号:</label>
            <input type="text" class="form-control" v-model="newSheet.code">
        </div>
        <div class="form-group">
            <label >表面处理方式:</label>
            <input type="text" class="form-control" v-model="newSheet.dispose">
        </div>
        <div class="form-group">
            <label class="mulit">件数:</label>
            <input type="number" class="form-control" v-model="newSheet.num">
        </div>
        <div class="form-group">
            <label class="mulit">单件重量:</label>
            <input type="number" class="form-control" v-model="newSheet.weight">
        </div>
        <div class="form-group">
            <label class="mulit">加工图编号:</label>
            <input type="text" class="form-control" v-model="newSheet.number">
        </div>
        <div class="form-group">
            <label>备注</label>
            <input type="text" class="form-control" v-model="newSheet.remark">
        </div>
					</div>
      </div>
						<!-- --type=4-- -->
      <div class="modal-body" v-if="order.type==4">
				<div class="modal-body">
							<div class="form-group">
									<label class="mulit">名称</label>
									<input type="text" class="form-control" v-model="newSheet.name">
							</div>
							<div class="form-group">
									<label >规格:</label>
									<input type="text" class="form-control" v-model="newSheet.standard">
							</div>
							<div class="form-group">
									<label >材质:</label>F
									<input type="text" class="form-control" v-model="newSheet.quality">
							</div>
							<div class="form-group">
									<label class="mulit">单位:</label>
									<input type="text" class="form-control" v-model="newSheet.unit" >
							</div>
							<div class="form-group">
									<label class="mulit">数量:</label>
								<input type="number" class="form-control" v-model="newSheet.num">
							</div>
							<div class="form-group">
									<label>品牌:</label>
									<input type="text" class="form-control" v-model="newSheet.brand">
							</div>
							<div class="form-group">
									<label>备注</label>
									<input type="text" class="form-control" v-model="newSheet.remark">
							</div>
					</div>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
				<button type="button" class="btn btn-success" data-dismiss="modal" @click="addSheetHandle">保存</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
      </div>
 
    </div>
  </div>
</div>
<!-- --------上传附件---------- -->
<div class="modal fade" id="addFiles" style="max-height:80%;overflow-y:scroll">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">上传附件</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
            <div class="form-group" > 
                <input id="0_upload-file" type="file" multiple class="file-loading">  
            </div>
      </div>

      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" @click="sendFiles">确定</button>
      </div>
 
    </div>
  </div>
</div>


<!-- -------下载模板-------- -->
<!-- ---铝----- -->
<div style="display:none">
<table id="downToExcel_lv" border=1 align="center" width="600" style="font-family:'宋体'">
		<tr align="center" style="height:20px">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
      <td></td>
		</tr>
		<tr align="center">
			<td colspan="12" style="font-weight:800;font-size:25px;">铝型材提料单</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px">
			<td colspan="2">工程名称</td>
			<td colspan="4">{{projectInfo.name}}</td>
			<td colspan="3">料单编号</td>
			<td colspan="3">#{{order.id}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px" height=25>
			<td colspan="2">施工分区</td>
			<td colspan="4">{{order.position}}</td>
			<td colspan="3">送达地点</td>
			<td colspan="3">{{order.target_position}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px" height=25>
			<td rowspan="2">序号</td>
      <td rowspan="2">名称</td>
      <td rowspan="2">型材代号</td>
      <td rowspan="2">材质</td>
      <td colspan="2">表面处理</td>
			<td>长度</td>
      <td>数量</td>
      <td>线密度</td>
      <td>每支重量</td>
      <td>总重</td>
			<td rowspan="2">备注</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px;height:25px">
			<td>类别</td>
      <td>色号</td>
      <td>(m)</td>
      <td>支数</td>
      <td>(kg/m)</td>
      <td>(kg)</td>
      <td>(kg)</td>
		</tr>
		<tr align="center" style="height:35px" v-for="(item,key) in order.sheetList" :key="key">
      <td class="omit">{{key+1}}</td>
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
		<tr align="center" style="font-weight:700;font-size:16px;height:30px" height=25>
			<td colspan="4">本页合计</td>
      <td></td>
      <td></td>
      <td></td>
      <td>{{all_num}}</td>
      <td></td>
      <td></td>
      <td>{{all_weight?all_weight.toFixed(3):0}}</td>
      <td></td>
		</tr>
    <tr style="height:30px">
      <td colspan="12" rowspan="4" style="height:30px">技术要求:{{order.specifications}}</td>
    </tr>
    <tr style="height:30px"></tr>
    <tr style="height:30px"></tr>
    <tr style="height:30px"></tr>
    <tr align="center" style="height:30px">
      <td colspan="2">设计</td>
      <td colspan="2"></td>
      <td >日期</td>
      <td colspan="2"></td>
      <td colspan="3" rowspan="3">共  页</td>
      <td colspan="2" rowspan="3">第  页</td>
    </tr>
    <tr align="center" style="height:30px">
      <td colspan="2">审核</td>
      <td colspan="2"></td>
      <td >日期</td>
      <td colspan="2"></td>
    </tr>
    <tr align="center" style="height:30px">
      <td colspan="2">审核</td>
      <td colspan="2"></td>
      <td >日期</td>
      <td colspan="2"></td>
    </tr>
</table>
<!-- ----钢----- -->
<table id="downToExcel_gang" border=1 align="center" width="600" style="font-family:'宋体'">
		<tr align="center" style="height:20px">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr align="center">
			<td colspan="11" style="font-weight:800;font-size:25px;">钢材提料单</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px">
			<td colspan="2">工程名称</td>
			<td colspan="3">{{projectInfo.name}}</td>
			<td colspan="2">料单编号</td>
			<td colspan="4">#{{order.id}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px" height=25>
			<td colspan="2">施工分区</td>
			<td colspan="3">{{order.position}}</td>
			<td colspan="2">送达地点</td>
			<td colspan="4">{{order.target_position}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px" height=25>
			<td rowspan="2">序号</td>
      <td rowspan="2">名称</td>
      <td rowspan="2">规格</td>
      <td rowspan="2">材质</td>
      <td rowspan="2">表面处理</td>
			<td>长度</td>
      <td>数量</td>
      <td>线密度</td>
      <td>每支重量</td>
      <td>总重</td>
			<td rowspan="2">备注</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px;height:25px">
      <td>(m)</td>
      <td>支数</td>
      <td>(kg/m)</td>
      <td>(kg)</td>
      <td>(kg)</td>
		</tr>
		<tr align="center" style="height:35px" v-for="(item,key) in order.sheetList" :key="key">
      <td class="omit">{{key+1}}</td>
                  <td class="omit">{{item.name}}</td>
                  <td class="omit">{{item.standard}}</td>
                  <td class="omit">{{item.quality}}</td>
                  <td class="omit">{{item.dispose}}</td>
                  <td class="omit">{{item.length}}</td>
                  <td class="omit">{{item.num}}</td>
                  <td class="omit">{{item.rou}}</td>
                  <td class="omit">{{(item.rou*item.length).toFixed(3)}}</td>
                  <td class="omit text-info">{{(item.rou*item.num*item.length).toFixed(3)}}</td>
                  <td class="omit">{{item.remark}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px;height:30px" height=25>
			<td colspan="4">本页合计</td>
      <td></td>
      <td></td>
      <td>{{all_num}}</td>
      <td></td>
      <td></td>
      <td>{{all_weight?all_weight.toFixed(3):0}}</td>
      <td></td>
		</tr>
    <tr style="height:30px">
      <td colspan="11" rowspan="4" style="height:30px">技术要求:{{order.specifications}}</td>
    </tr>
    <tr style="height:30px"></tr>
    <tr style="height:30px"></tr>
    <tr style="height:30px"></tr>
    <tr align="center" style="height:30px">
      <td colspan="2">设计</td>
      <td colspan="2"></td>
      <td >日期</td>
      <td colspan="1"></td>
      <td colspan="3" rowspan="3">共  页</td>
      <td colspan="2" rowspan="3">第  页</td>
    </tr>
    <tr align="center" style="height:30px">
      <td colspan="2">审核</td>
      <td colspan="2"></td>
      <td >日期</td>
      <td colspan="1"></td>
    </tr>
    <tr align="center" style="height:30px">
      <td colspan="2">审核</td>
      <td colspan="2"></td>
      <td >日期</td>
      <td colspan="1"></td>
    </tr>
</table>
<!-- ----板----- -->
<table id="downToExcel_ban" border=1 align="center" width="600" style="font-family:'宋体'">
		<tr align="center" style="height:20px">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr align="center">
			<td colspan="11" style="font-weight:800;font-size:25px;">板材提料单</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px">
			<td colspan="2">工程名称</td>
			<td colspan="4">{{projectInfo.name}}</td>
			<td colspan="2">料单编号</td>
			<td colspan="3">#{{order.id}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px" height=25>
			<td colspan="2">施工分区</td>
			<td colspan="4">{{order.position}}</td>
			<td colspan="2">送达地点</td>
			<td colspan="3">{{order.target_position}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px" height=25>
			<td rowspan="2">序号</td>
      <td rowspan="2">名称</td>
      <td rowspan="2" colspan="2">编号</td>
      <td colspan="2">规格尺寸(mm)</td>
      <td>数量</td>
      <td>单片面积</td>
      <td>总面积</td>
      <td rowspan="2">加工图编号</td>
			<td rowspan="2">备注</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px;height:25px">
      <td>宽(W)</td>
      <td>高(H)</td>
      <td>片</td>
      <td>(㎡)</td>
      <td>(㎡)</td>
		</tr>
		<tr align="center" style="height:35px" v-for="(item,key) in order.sheetList" :key="key">
      <td class="omit">{{key+1}}</td>
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
		<tr align="center" style="font-weight:700;font-size:16px;height:30px" height=25>
			<td colspan="4">本页合计</td>
      <td></td>
      <td></td>
      <td>{{all_num}}</td>
      <td></td>
      <td>{{all_weight?all_weight.toFixed(3):0}}</td>
      <td></td>
		</tr>
    <tr style="height:30px">
      <td colspan="11" rowspan="4" style="height:30px">技术要求:{{order.specifications}}</td>
    </tr>
    <tr style="height:30px"></tr>
    <tr style="height:30px"></tr>
    <tr style="height:30px"></tr>
    <tr align="center" style="height:30px">
      <td colspan="2">设计</td>
      <td colspan="2"></td>
      <td >日期</td>
      <td colspan="2"></td>
      <td colspan="2" rowspan="3">共  页</td>
      <td colspan="2" rowspan="3">第  页</td>
    </tr>
    <tr align="center" style="height:30px">
      <td colspan="2">审核</td>
      <td colspan="2"></td>
      <td >日期</td>
      <td colspan="2"></td>
    </tr>
    <tr align="center" style="height:30px">
      <td colspan="2">审核</td>
      <td colspan="2"></td>
      <td >日期</td>
      <td colspan="2"></td>
    </tr>
</table>
<!-- ----件----- -->
<table id="downToExcel_jian" border=1 align="center" width="600" style="font-family:'宋体'">
		<tr align="center" style="height:20px">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>

		</tr>
		<tr align="center">
			<td colspan="9" style="font-weight:800;font-size:25px;">钢加工件提料单</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px">
			<td colspan="2">工程名称</td>
			<td colspan="2">{{projectInfo.name}}</td>
			<td colspan="2">料单编号</td>
			<td colspan="3">#{{order.id}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px" height=25>
			<td colspan="2">施工分区</td>
			<td colspan="2">{{order.position}}</td>
			<td colspan="2">送达地点</td>
			<td colspan="3">{{order.target_position}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px" height=25>
			<td rowspan="2">序号</td>
      <td rowspan="2">名称</td>
      <td rowspan="2">编号</td>
      <td rowspan="2">表面处理</td>
      <td>数量</td>
      <td>单片重量</td>
      <td>总重</td>
      <td rowspan="2">加工图编号</td>
			<td rowspan="2">备注</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px;height:25px">
      <td>件</td>
      <td>(kg)</td>
      <td>(kg)</td>
		</tr>
		<tr align="center" style="height:35px" v-for="(item,key) in order.sheetList" :key="key">
      <td class="omit">{{key+1}}</td>
                  <td class="omit">{{item.name}}</td>
                  <td class="omit">{{item.code}}</td>
                  <td class="omit">{{item.dispose}}</td>
                  <td class="omit">{{item.num}}</td>
                  <td class="omit">{{item.weight}}</td>
                  <td class="omit text-info">{{(item.num*item.weight).toFixed(3)}}</td>
                  <td class="omit">{{item.number}}</td>
                  <td class="omit">{{item.remark}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px;height:30px" height=25>
			<td colspan="3">本页合计</td>
      <td></td>
      <td>{{all_num}}</td>
      <td></td>
      <td>{{all_weight?all_weight.toFixed(3):0}}</td>
      <td></td>
      <td></td>
		</tr>
    <tr style="height:30px">
      <td colspan="9" rowspan="4" style="height:30px">技术要求:{{order.specifications}}</td>
    </tr>
    <tr style="height:30px"></tr>
    <tr style="height:30px"></tr>
    <tr style="height:30px"></tr>
    <tr align="center" style="height:30px">
      <td colspan="2">设计</td>
      <td colspan="1"></td>
      <td >日期</td>
      <td colspan="1"></td>
      <td colspan="2" rowspan="3">共  页</td>
      <td colspan="2" rowspan="3">第  页</td>
    </tr>
    <tr align="center" style="height:30px">
      <td colspan="2">审核</td>
      <td colspan="1"></td>
      <td >日期</td>
      <td colspan="1"></td>
    </tr>
    <tr align="center" style="height:30px">
      <td colspan="2">审核</td>
      <td colspan="1"></td>
      <td >日期</td>
      <td colspan="1"></td>
    </tr>
</table>
<!-- ----辅----- -->
<table id="downToExcel_fu" border=1 align="center" width="600" style="font-family:'宋体'">
		<tr align="center" style="height:20px">
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
		<tr align="center">
			<td colspan="8" style="font-weight:800;font-size:25px;">辅助材料提料单</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px">
			<td colspan="2">工程名称</td>
			<td colspan="2">{{projectInfo.name}}</td>
			<td colspan="2">料单编号</td>
			<td colspan="2">#{{order.id}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px" height=25>
			<td colspan="2">施工分区</td>
			<td colspan="2">{{order.position}}</td>
			<td colspan="2">送达地点</td>
			<td colspan="2">{{order.target_position}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px" height=25>
			<td rowspan="2">序号</td>
      <td rowspan="2">名称</td>
      <td rowspan="2">规格</td>
      <td rowspan="2">材质</td>
      <td rowspan="2">单位</td>
      <td rowspan="2">数量</td>
      <td rowspan="2">品牌</td>
			<td rowspan="2">备注</td>
		</tr>
    <tr></tr>
		<tr align="center" style="height:35px" v-for="(item,key) in order.sheetList" :key="key">
      <td class="omit">{{key+1}}</td>
      <td class="omit">{{item.name}}</td>
      <td class="omit">{{item.standard}}</td>
      <td class="omit">{{item.quality}}</td>
      <td class="omit">{{item.unit}}</td>
      <td class="omit">{{item.num}}</td>
      <td class="omit">{{item.brand}}</td>
      <td class="omit">{{item.remark}}</td>
		</tr>
		<tr align="center" style="font-weight:700;font-size:16px;height:30px" height=25>
			<td colspan="3">本页合计</td>
      <td></td>
      <td></td>
      <td>{{all_num}}</td>
      <td></td>
      <td></td>
		</tr>
    <tr style="height:30px">
      <td colspan="8" rowspan="4" style="height:30px">技术要求:{{order.specifications}}</td>
    </tr>
    <tr style="height:30px"></tr>
    <tr style="height:30px"></tr>
    <tr style="height:30px"></tr>
    <tr align="center" style="height:30px">
      <td colspan="2">设计</td>
      <td colspan="1"></td>
      <td >日期</td>
      <td colspan="2"></td>
      <td colspan="1" rowspan="3">共  页</td>
      <td colspan="1" rowspan="3">第  页</td>
    </tr>
    <tr align="center" style="height:30px">
      <td colspan="2">审核</td>
      <td colspan="1"></td>
      <td >日期</td>
      <td colspan="2"></td>
    </tr>
    <tr align="center" style="height:30px">
      <td colspan="2">审核</td>
      <td colspan="1"></td>
      <td >日期</td>
      <td colspan="2"></td>
    </tr>
</table>


</div>
  </div>
</template>

<script>
import {lv,gang,jian,fu,ban} from '../../config/excel_json.js';
import {readExcel,downExcel} from '../../config/mUtils.js';
import {checkPower,details} from '../../api/pro.js';
import {files_url,baseUrl} from '../../config/env.js';
import {getSheetInfo,getOrderInfo,edit_order,delete_sheet,edit_sheet_api,add_sheet,add_file,sendAllow,sendBack} from '../../api/order.js';
import {LOADING_START,LOADING_END} from '../../store/mutation_types.js';
export default {
  created(){
    this.init();
  },
  data(){
    return {
      projectInfo:'',
      power:'',
      files_url:'',
      order:{},
			edit_sheet:{},
			newSheet:{},
      stemp:{},
      newSheetList:[]
    }
  },
  methods:{
    async init(){
      this.$store.commit(LOADING_START)
      this.files_url=files_url;
      let res=await getSheetInfo(this.$route.params.oid);
      let res1=await checkPower({id:this.$route.params.id});
      let res2=await details({pid:this.$route.params.id});
      this.$store.commit(LOADING_END)
      if(res.data.res==0){alert(res.data.text);return;}
      if(res2.data.res==0){alert(res2.data.text);return;}
      this.baseUrl=baseUrl;
      this.projectInfo=res2.data.body;
      this.order=res.data.body;
      this.power=res1.data.body;
    },
    async edit_handle(){
      this.$store.commit(LOADING_START)
      let res=await edit_order(this.order);
      this.$store.commit(LOADING_END)
      if(res.data.res==0){alert(res.data.text);return;}
    },
    sheetEdit(id){
      console.log(this.order.sheetList.filter(item=>item.id==id)[0])
      this.stemp=JSON.parse(JSON.stringify(this.order.sheetList.filter(item=>item.id==id)[0]));
      this.edit_sheet=JSON.parse(JSON.stringify(this.order.sheetList.filter(item=>item.id==id)[0]));
    },
    async sheetDelete(id){
      if(window.confirm('确认删除提料单？')){
        this.$store.commit(LOADING_START)
				let res=await delete_sheet({sheet:id,type:this.order.type});
				this.$store.commit(LOADING_END)
				if(res.data.res==0){alert(res.data.text);return;}
				this.order.sheetList=this.order.sheetList.filter(item=>item.id!=id);
      }
    },
    async editHandle(){
      let pass=true;
			$.each($('#sheetEdit .mulit'),function(){
					if(!$(this).parent('.form-group').children('input').val() || $(this).parent('.form-group').children('input').val()==''){
							pass=false;
					}
			})
      if(!pass){
        alert('请填写必填项！');
      }
			let sheet=this.edit_sheet;
			this.$store.commit(LOADING_START)
      let res=await edit_sheet_api({sheet:sheet,type:this.order.type});
      this.$store.commit(LOADING_END)
      if(res.data.res==0){alert(res.data.text);return;}
      this.order.sheetList.forEach((item,key)=>{
          if(item.id==this.edit_sheet.id){
            Object.keys(this.edit_sheet).forEach(item2=>{
              this.order.sheetList[key][item2]=this.edit_sheet[item2]
            })
          }
          return;
      })
		},
		async addSheetHandle(){
			// 校验
			let pass=true;
			$.each($('#addSheet .mulit'),function(){
					if(!$(this).parent('.form-group').children('input').val() || $(this).parent('.form-group').children('input').val()==''){
							pass=false;
					}
			})
			if(!pass){alert('请填写必填项！');return;}

			let id=this.order.id;
			let type=this.order.type;
			this.$store.commit(LOADING_START)
			let res=await add_sheet({id,type,sheet:this.newSheet})
			this.$store.commit(LOADING_END)
			if(res.data.res==0){alert(res.data.text);return;}
			this.order.sheetList.push(res.data.body)
		},
		async addSheet_exc(){
            let result=[];
            console.log('---导入excel---')
            if(!event.srcElement.files[0]){return}
            let data=event.srcElement.files[0];
            this.$store.commit(LOADING_START)
            let res=await readExcel(data);
            this.$store.commit(LOADING_END)
            let sheet=res.Sheets[res.SheetNames[0]];//excel所有数据
            let json=XLSX.utils.sheet_to_json(sheet);//转化成json
            json.forEach(item => {
                // && item['__EMPTY'].test(/^[0-9]+$/)
                if(item.__EMPTY && /^[0-9]+$/.test(item['__EMPTY'])){
                    result.push(item);
                }
            });
            result.forEach(item=>{
                if(Object.keys(item).length<=3){return};
                let stempJson={};
                Object.keys(item).forEach(item2=>{
                    if(item2!='__EMPTY' && this.excelJson[item2]){
                        stempJson[this.excelJson[item2]]=item[item2];
                    }
                })
                this.newSheetList.push(stempJson)
            })
            if(!confirm('添加'+this.orderType+'条目共计'+this.newSheetList.length+'条？')){return;}
      let id=this.order.id;
			let type=this.order.type;
      this.$store.commit(LOADING_START)
      let promseList=[];
      this.newSheetList.forEach(item=>{
        promseList.push(add_sheet({id,type,sheet:item}))
      })
      Promise.all(promseList).then((result) => {
        console.log(result)               //['成功了', 'success']
      }).catch((error) => {
        console.log(error)
      })
      this.$store.commit(LOADING_END)
      this.init();
    },
    download(url){
      window.open(url)
    },
    delete_file(id){
      if(!window.confirm('确认删除附件？')){return;}
    },
    to_uploadFile(){
      if(!this.allow_uploadFile){alert('没有权限上传');return;}
      $('#files').modal('hide');
      $('#addFiles').modal('show');
    },
    async uploadFileHandle(files){
      this.$store.commit(LOADING_START)
      let res=await add_file({order:this.order.id,files:files})
      this.$store.commit(LOADING_END)
      if(res.data.res==0){alert(res.data.text);return;}
      $('#addFiles').modal('hide');
      this.init();
    },
    sendFiles(){
      $('#0_upload-file').fileinput('upload');
    },
    async sendAllow(){
      if(!this.order.processing || this.order.processing==''){alert('没有权限');return;}
      let type=parseInt(this.order.processing.split(';')[0]);
      this.$store.commit(LOADING_START)
      let res='';
      if(type==1){
        res=await sendAllow({id:this.order.id,type:0})
      }else{
        res=await sendAllow({id:this.order.id,type:1})
      }
      
      this.$store.commit(LOADING_END)
      if(res.data.res==0){alert(res.data.text);return;}
      this.init();
    },
    async sendBack(){
      if(!this.order.processing || this.order.processing==''){alert('没有权限');return;}
      let type=parseInt(this.order.processing.split(';')[0]);
      this.$store.commit(LOADING_START)
      let res='';
      if(type==1){
        res=await sendBack({id:this.order.id,type:0})
      }else{
        res=await sendBack({id:this.order.id,type:1})
      }
      this.$store.commit(LOADING_END)
      if(res.data.res==0){alert(res.data.text);return;}
      this.init();
    },
    export_excel(){
      // this.downloadMater ();
      switch(parseInt(this.order.type)){
        case 0:ExportUtil.toExcel("downToExcel_lv");break;
        case 1:ExportUtil.toExcel("downToExcel_gang");break;
        case 2:ExportUtil.toExcel("downToExcel_ban");break;
        case 3:ExportUtil.toExcel("downToExcel_jian");break;
        case 4:ExportUtil.toExcel("downToExcel_fu");break;
        default:alert('加载中');break;
      }
      ExportUtil.toExcel("downToExcel");	
    },
    downloadMater(){
      let tmpDown = downExcel(this.order.sheetList,this.order.type);
      window.FileSaver.saveAs(tmpDown, "hello world.xlsx");
    }
  },
  computed:{
    all_num(){
      if(!this.order.sheetList || this.order.sheetList.length<=0){return '0'}
      return this.order.sheetList.reduce((pre,cur,index,arr)=>{
        return parseInt(pre)+parseInt(cur.num)
      },0)
    },
    all_weight(){
      if(!this.order.sheetList || this.order.sheetList.length<=0){return 0}
      if(this.order.type==3){
        return this.order.sheetList.reduce((pre,cur,index,arr)=>{
        return parseFloat(pre)+parseFloat((cur['num']*cur['weight']).toFixed(3))
      },0)
      }
      if(this.order.type==2){
        return this.order.sheetList.reduce((pre,cur,index,arr)=>{
        return parseFloat(pre)+parseFloat((cur['num']*cur['acreage']).toFixed(3))
      },0)
      }
      return this.order.sheetList.reduce((pre,cur,index,arr)=>{
        return parseFloat(pre)+parseFloat((cur['rou']*cur['length']*cur.num).toFixed(3))
      },0)
    },
    allow_addSheet(){
      if(this.power===''){return false}
      if(this.state==1 || this.state==4 || this.state==6){return false}
      return this.$store.state.jobList[this.power].indexOf(11)>=0 || this.$store.state.userInfo.type==0 || this.order.user==this.$store.state.userInfo.id;
    },
    allow_deleteSheet(){
      if(this.power===''){return false}
      if(this.state==1 || this.state==4 || this.state==6){return false}
      return this.$store.state.jobList[this.power].indexOf(21)>=0 || this.$store.state.userInfo.type==0 || this.order.user==this.$store.state.userInfo.id;
    },
    allow_deleteFile(){
      if(this.power===''){return false}
      if(this.state==1 || this.state==4 || this.state==6){return false}
      return this.$store.state.jobList[this.power].indexOf(22)>=0 || this.$store.state.userInfo.type==0 || this.order.user==this.$store.state.userInfo.id;
    },
    allow_editeOrder(){
      if(this.power===''){return false}
      if(this.state==1 || this.state==4 || this.state==6){return false}
      return this.$store.state.jobList[this.power].indexOf(30)>=0 || this.$store.state.userInfo.type==0 || this.order.user==this.$store.state.userInfo.id;
    },
    allow_editeSheet(){
      if(this.power===''){return false}
      if(this.state==1 || this.state==4 || this.state==6){return false}
      return this.$store.state.jobList[this.power].indexOf(31)>=0 || this.$store.state.userInfo.type==0 || this.order.user==this.$store.state.userInfo.id;
    },
    allow_uploadFile(){
      if(this.power===''){return false}
      if(this.state==1 || this.state==4 || this.state==6){return false}
      return this.$store.state.jobList[this.power].indexOf(12)>=0 || this.$store.state.userInfo.type==0 || this.order.user==this.$store.state.userInfo.id;
    },
    allow_check(){
      if(!this.order.auditor || this.order.auditor==''){return false};
      return this.order.auditor==this.$store.state.userInfo.id || this.$store.state.userInfo.type==0
    },
    state(){
      if(!this.order.processing || this.order.processing==''){return 0};
      return parseInt(this.order.processing.split(';')[0]);
    },
    state_words(){
      if(!this.order.processing || this.order.processing==''){return '未提交'};
      let type=parseInt(this.order.processing.split(';')[0]);
      switch (type){
        case 0: return '未提交';break;
        case 1: return '审核中';break;
        case 2: return '未通过';break;
        case 3: return '待提交';break;
        case 4: return '查收中';break;
        case 5: return '被退回';break;
        case 6: return '已完成';break;
        default:return '';break;
      }
    },
    excelJson(){
        if(this.order.type===null || this.order.type===''){return ''};
        switch (parseInt(this.order.type)){
            case 0:return lv;break;
            case 1:return gang;break;
            case 2:return ban;break;
            case 3:return jian;break;
            case 4:return fu;break;
            default:return '';break;
        }
    },
    orderType(){
      if(!this.order.type){return ''};
      switch(this.order.type){
        case 0 : return '铝型材';break;
        case 1 : return '钢型材';break;
        case 2 : return '板材';break;
        case 3 : return '钢加工件';break;
        case 4 : return '辅助材料';break;
        default:return '';break;
      }
    }
  },
  filters:{
    typeFilter(value){
      switch(value){
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
      return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d);
    }
  },
  mounted(){
      var _this = this;
      var layoutTemplates={//每个区域的模板
          main1: '{preview}\n' +
                  '<div class="kv-upload-progress kv-hidden"></div><div class="clearfix"></div>\n' +
                  '<div class="input-group {class}">\n' +//class是下面设置的mainclass
                  '  {caption}\n' +
                  '  <div class="input-group-btn">\n' +
                  '    {remove}\n' +
                  '    {cancel}\n' +
                  '    {upload}\n' +
                  '    {browse}\n' +
                  '  </div>\n' +
                  '</div>',
              main2: '{preview}\n<div class="kv-upload-progress hide"></div>\n{remove}\n{cancel}\n{upload}\n{browse}\n',
              preview: '<div class="file-preview {class}">\n' +//用于渲染预览的模板
                  '    {close}\n' +
                  '    <div class="close fileinput-remove">×</div>\n' +
                  '    <div class="{dropClass}">\n' +
                  '    <div class="file-preview-thumbnails">\n' +
                  '    </div>\n' +
                  '    <div class="clearfix"></div>' +
                  '    <div class="file-preview-status text-center text-success"></div>\n' +
                  '    <div class="kv-fileinput-error"></div>\n' +
                  '    </div>\n' +
                  '</div>',
              icon: '<span class="iconfont icon-add"></span>',//要在标题文本之前呈现的图标。
              caption: '<div class="file-caption form-control {class}" tabindex="500">\n' +//用于呈现标题的模板
                  '  <span class="file-caption-icon"></span>\n' +
                  '  <input class="file-caption-name" onkeydown="return false;" onpaste="return false;">\n' +
                  '</div>',
              btnDefault: '<button type="{type}" tabindex="500" title="{title}" class="{css}"{status}>{icon}{label}</button>',
              btnLink: '<a href="{href}" tabindex="500" title="{title}" class="{css}"{status}>{icon}{label}</a>',
              btnBrowse: '<div tabindex="500" class="{css}"{status}>{icon}{label}</div>',
              modalMain: '<div id="kvFileinputModal" class="file-zoom-dialog modal fade" tabindex="-1" aria-labelledby="kvFileinputModalLabel"></div>',
              modal: '<div class="modal-dialog modal-lg{rtl}" role="document">\n' +
                  '  <div class="modal-content">\n' +
                  '    <div class="modal-header">\n' +
                  '      <div class="kv-zoom-actions pull-right">{toggleheader}{fullscreen}{borderless}{close}</div>\n' +
                  '      <h3 class="modal-title">{heading} <small><span class="kv-zoom-title"></span></small></h3>\n' +
                  '    </div>\n' +
                  '    <div class="modal-body">\n' +
                  '      <div class="floating-buttons"></div>\n' +
                  '      <div class="kv-zoom-body file-zoom-content"></div>\n' + '{prev} {next}\n' +
                  '    </div>\n' +
                  '  </div>\n' +
                  '</div>\n',
              progress: '<div class="progress">\n' +
                  '    <div class="progress-bar progress-bar-success progress-bar-striped text-center" role="progressbar" aria-valuenow="{percent}" aria-valuemin="0" aria-valuemax="100" style="width:{percent}%;">\n' +
                  '        {status}\n' +
                  '     </div>\n' +
                  '</div>',
              footer: '<div class="file-thumbnail-footer">\n' +
                  '    <div class="file-caption-name" style="width:{width}">{caption}</div>\n' +
                  '    {progress} {actions}\n' +
                  '</div>',
              actions: '<div class="file-actions">\n' +
                  '    <div class="file-footer-buttons">\n' +
                  '        {upload} {download} {delete} {zoom} {other}' +
                  '    </div>\n' +
                  '    {drag}\n' +
                  '    <div class="file-upload-indicator" title="{indicatorTitle}">{indicator}</div>\n' +
                  '    <div class="clearfix"></div>\n' +
                  '</div>',
              actionDelete: '<button type="button" class="kv-file-remove {removeClass}" title="{removeTitle}"{dataUrl}{dataKey}>{removeIcon}</button>\n',
              actionUpload: '<button type="button" class="kv-file-upload {uploadClass}" title="{uploadTitle}">{uploadIcon}</button>\n',
              actionDownload: '<button type="button" class="{downloadClass}" title="{downloadTitle}" data-url="{downloadUrl}" data-caption="{caption}">{downloadIcon}</button>\n',
              actionZoom: '<button type="button" class="kv-file-zoom {zoomClass}" title="{zoomTitle}">{zoomIcon}</button>',
              actionDrag: '<span class="file-drag-handle {dragClass}" title="{dragTitle}">{dragIcon}</span>'
          }

      var previewZoomButtonIcons={//预览文件的各种图标
          prev: '<i class="iconfont icon-add"></i>',//上一个
          next: '<i class="iconfont icon-add"></i>',//下一个
          toggleheader: '<i class="iconfont icon-add"></i>',
          fullscreen: '<i class="iconfont icon-add"></i>',//全屏
          borderless: '<i class="iconfont icon-add"></i>',//最大
          close: '<i class="iconfont icon-add"></i>'//关闭
      }

      var previewSettings={//对象用于渲染上面设置的每个预览文件类型的CSS样式设置
          image: {width: "40%", height: "auto"},
          html: {width: "213px", height: "160px"},
          text: {width: "213px", height: "160px"},
          office: {width: "213px", height: "160px"},
          gdocs: {width: "213px", height: "160px"},
          video: {width: "213px", height: "160px"},
          audio: {width: "100%", height: "30px"},
          flash: {width: "213px", height: "160px"},
          object: {width: "213px", height: "160px"},
          pdf: {width: "213px", height: "160px"},
          other: {width: "213px", height: "160px"}
      }

      var fileActionSettings={//缩略图的各种
          showRemove: true,//是否在缩略图中显示删除按钮
          showUpload: false,//是否在缩略图中显示上传按钮
          showDownload: false,//是否在缩略图中显示下载按钮
          showZoom: false,//是否在缩略图中显示缩放按钮
          showDrag: false,//是否在缩略图中显示拖动按钮（仅适用于初始预览内容）
          removeIcon: '<i class="iconfont icon-remove2">删除</i>',//用于删除按钮的图标，以显示在每个文件缩略图中。
          removeClass: 'btn btn-kv btn-default btn-outline-secondary',//每个文件缩略图中删除按钮的CSS类。
          removeErrorClass: 'btn btn-kv btn-danger',
          removeTitle: '删除',//每个文件缩略图中删除按钮的标题。
          uploadIcon: '<i class="glyphicon glyphicon-upload"></i>',
          uploadClass: 'btn btn-kv btn-default btn-outline-secondary',
          uploadTitle: 'Upload file',
          uploadRetryIcon: '<i class="glyphicon glyphicon-repeat"></i>',
          uploadRetryTitle: 'Retry upload',
          downloadIcon: '<i class="glyphicon glyphicon-download"></i>',
          downloadClass: 'btn btn-kv btn-default btn-outline-secondary',
          downloadTitle: 'Download file',
          zoomIcon: '<i class="glyphicon glyphicon-zoom-in"></i>',
          zoomClass: 'btn btn-kv btn-default btn-outline-secondary',
          zoomTitle: 'View Details',
          dragIcon: '<i class="glyphicon glyphicon-move"></i>',
          dragClass: 'text-info',
          dragTitle: 'Move / Rearrange',
          dragSettings: {},
          indicatorNew: '<i class="glyphicon glyphicon-plus-sign text-warning"></i>',
          indicatorSuccess: '<i class="glyphicon glyphicon-ok-sign text-success"></i>',
          indicatorError: '<i class="glyphicon glyphicon-exclamation-sign text-danger"></i>',
          indicatorLoading: '<i class="glyphicon glyphicon-hourglass text-muted"></i>',
          indicatorNewTitle: 'Not uploaded yet',
          indicatorSuccessTitle: '上传完毕',
          indicatorErrorTitle: '上传失败',
          indicatorLoadingTitle: '上传中...',

      }
      
      var previewFileIconSettings={//对象每个文件扩展名（类型）的预览图标标记设置
          'doc': '<i class="fa fa-file-word-o text-primary"></i>',
          'xls': '<i class="iconfont icon-fill222 text-success"></i>',
          'ppt': '<i class="fa fa-file-powerpoint-o text-danger"></i>',
          'jpg': '<i class="fa fa-file-photo-o text-warning"></i>',
          'pdf': '<i class="fa fa-file-pdf-o text-danger"></i>',
          'zip': '<i class="fa fa-file-archive-o text-muted"></i>',
      }

      var fileTypeSettings={//对象设置以在选择要上载文件时验证和标识每种文件类型
          image: function(vType, vName) {
              return (typeof vType !== "undefined") ? vType.match('image.*') && !vType.match(/(tiff?|wmf)$/i) : vName.match(/\.(gif|png|jpe?g)$/i);
          },
          html: function(vType, vName) {
              return (typeof vType !== "undefined") ? vType == 'text/html' : vName.match(/\.(htm|html)$/i);
          },
          office: function (vType, vName) {
              return vType.match(/(word|excel|powerpoint|office)$/i) ||
                  vName.match(/\.(docx?|xlsx?|pptx?|pps|potx?)$/i);
          },
          gdocs: function (vType, vName) {
              return vType.match(/(word|excel|powerpoint|office|iwork-pages|tiff?)$/i) ||
                  vName.match(/\.(rtf|docx?|xlsx?|pptx?|pps|potx?|ods|odt|pages|ai|dxf|ttf|tiff?|wmf|e?ps)$/i);
          },
          text: function(vType, vName) {
              return false;
          },
          video: function (vType, vName) {
              return typeof vType !== "undefined" && vType.match(/\.video\/(ogg|mp4|webm)$/i) || vName.match(/\.(og?|mp4|webm)$/i);
          },
          audio: function (vType, vName) {
              return typeof vType !== "undefined" && vType.match(/\.audio\/(ogg|mp3|wav)$/i) || vName.match(/\.(ogg|mp3|wav)$/i);
          },
          flash: function (vType, vName) {
              return typeof vType !== "undefined" && vType == 'application/x-shockwave-flash' || vName.match(/\.(swf)$/i);
          },
          object: function (vType, vName) {
              return true;
          },
          other: function (vType, vName) {
              return true;
          },
      }


      $("#0_upload-file").fileinput({
          theme:'fa',
          language: 'zh', //设置语言
          uploadUrl: baseUrl+'api/file/pro', //上传的地址
          allowedFileExtensions: null,//接收的文件后缀
          showCaption: false,//是否显示标题
          browseClass: "btn btn-primary", //按钮样式     
          dropZoneEnabled: false,//是否显示拖拽区域
          showRemove:false,//是否显示remove按钮
          showUpload:false,//是否显示upload按钮
          showClose:false,//是否显示关闭按钮
          showCancel:false,//是否显示取消按钮
            hideThumbnailContent: true,//不预览
          // showUploadedThumbs:true,//是否在预览窗口中持续显示上传的文件缩略图（对于ajax上传），直到按下删除/清除按钮。默认为true。设置false为时，选择上传的下一批文件将从预览中清除这些缩略图
          // browseOnZoneClick:false,//是否在单击预览区域时启用文件浏览/选择。默认为false
          // autoReplace:false,//是否在maxFileCount达到限制后自动替换预览中的文件并选择一组新文件。这仅maxFileCount在设置有效时才有效
          // mainClass:'file-caption-main',//要附加到主插件容器的任何其他CSS类，它将呈现标题以及浏览，删除和上载按钮。默认为file-caption-main
          // //minImageWidth: 50, //图片的最小宽度
          // //minImageHeight: 50,//图片的最小高度
          //maxImageWidth: 1000,//图片的最大宽度
          //maxImageHeight: 1000,//图片的最大高度
          // //maxFileSize: 0,//单位为kb，如果为0表示不限制文件大小
          // //minFileCount: 0,
          // maxFileCount: 10, //表示允许同时上传的最大文件个数
          // enctype: 'multipart/form-data',
          // validateInitialCount:true,
          // previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
          // msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
          // initialPreviewShowDelete:true,//是否将为每个创建的缩略图显示删除按钮
          // initialCaption:'已选择{preview-file-count}个文件',
          // layoutTemplates:layoutTemplates,
          // previewZoomButtonIcons:previewZoomButtonIcons,
          frameClass:'krajee-default',//另外应用于每个文件缩略图框架的CSS类。默认为krajee-default。
          language: 'zh', 
          uploadAsync:false,
          browseClass: "btn btn-info",
          textEncoding:"UTF-8",
          showPreview :true,
          dropZoneEnabled: false,
          previewFileIconSettings,
          maxFileCount:15,
          fileTypeSettings,
          fileActionSettings,
          previewFileIcon:'<i class="iconfont icon-icon-fill222"></i>',//当检测到用于预览的不可读文件类型时，每个预览文件缩略图中显示的图标
          enctype:'multipart/form-data',
          msgFilesTooMany: "选择上传的文件数量({n}) 超过允许的最大数值{m}！",
          browseLabel:'',//上传按钮的文字
          browseIcon:'<i class="iconfont icon-1601shangchuan">选择文件</i>',
          msgUploadEmpty:'只能上传图片',
          msgInvalidFileExtension:'暂不支持"{name}"的文件类型上传.请上传"{extensions}"格式的文件'

      }).on("filebatchselected", function(event, files) {
          console.log('-----------')
          console.log('filebatchselected',event,files)
          console.log('-----------')
      }).on("filebatchuploadsuccess", function (event, data, previewId, index){
          if(data.response.res == 1)
          {
              _this.$store.commit(LOADING_START)
              _this.uploadFileHandle(data.response.body);
          }else{
              alert("上传文件失败!");
          }

      }).on('fileerror', function(event, data, msg) {
          console.log('-----------')
          console.log('fileerror',event, data, msg)
          console.log('-----------')
            alert(msg);
      });
  }
}
</script>

<style scoped lang="less">
@import "../../assets/css/theme.less";
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
.table-responsive th{
  white-space: nowrap;
}
.table-responsive .omit{
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.step-box{
  font-size:12px;
  width:100%;
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

</style>
