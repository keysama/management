<template>
<div class="col-md-12"  style="background-color:#fff;padding-bottom:20px">
        <div class="col-md-4 offset-md-4 box" style="margin-top:20px">
        <div class="d-flex justify-content-center align-items-center">
            <span class="step step1 text-center" style="flex:1">类别</span>
            <span class="step step2 text-center " style="flex:2">订单信息</span>
            <span class="step step3 text-center active" style="flex:2">提料单</span>
        </div>

        <div class="form-group" style="margin-top:20px">
            <label >添加提料:</label>
            <div class="text-center d-flex justify-content-around">
                <span class="btn btn-info" style="font-size:.5rem;position:relative">
                    <input type="file" name="orders" style="position:absolute;width:100%;height:100%;opacity:0"  @change="loadFile($event)">从excel导入
                </span>
                  <span class="btn btn-info" style="font-size:.5rem" data-toggle="modal" :data-target="'#'+$store.state.newOrder.type">添加单条</span>
            </div>
        </div>
        <div class="form-group" style="border-top:1px solid #ececec;padding-top:10px">
            <label >上传附件:</label>
            <div class="text-center">
                <span class="btn btn-primary" style="font-size:.5rem" data-toggle="modal" data-target="#files">选择附件</span>
            </div>
        </div>
         <div class="form-group d-flex flex-column selects" style="border-top:1px solid #ececec;padding-top:10px">
            <label >提料列表:</label>
            <div>
                <ul class="list-group" style="min-height:50px;max-height:200px;overflow-y:scroll;padding:10px">
                <li class="list-group-item" v-for="(item,key) in sheet" :key="key">{{item.name}}</li>
                </ul>
            </div>
        </div>
         <div class="controller" style="border-top:1px solid #ececec;padding-top:10px">
             <router-link to="step2" class="btn btn-outline-primary">上一步</router-link>
             <button class="btn btn-outline-primary" @click="start()" >完成</button>
        </div>
    </div>

<!-- ----------模态框-type=0--------- -->
<div class="modal fade" id="0">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">详细信息(铝型材)</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
        <div class="form-group">
            <label class="mulit">名称</label>
            <input type="text" class="form-control" v-model.lazy="newSheet.name">
        </div>
        <div class="form-group">
            <label class="mulit">型材代号</label>
            <input type="text" class="form-control" v-model="newSheet.code" @input="code_check($event)">
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
            <label class="mulit">线密度(kg/m):</label>
            <input type="text" class="form-control" v-model="newSheet.rou" :placeholder="rou_tip" ref="inputR">
        </div>
        <!-- <div class="form-group">
            <label >每支重量(kg/m):</label>
            <input type="number" class="form-control" v-model.lazy="newSheet.weight">
        </div> -->
        <div class="form-group">
            <label>备注</label>
            <input type="text" class="form-control" v-model.lazy="newSheet.remark">
        </div>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" @click="addSheet(0)">确定</button>
      </div>
 
    </div>
  </div>
</div>
<!-- -----------------type=1----------------- -->
<div class="modal fade" id="1">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">详细信息(钢型材)</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
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
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" @click="addSheet(1)">确定</button>
      </div>
 
    </div>
  </div>
</div>
<!-- --------------type=2--------------- -->
<div class="modal fade" id="2">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">详细信息(板材)</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
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
            <input type="number" class="form-control" v-model="newSheet.acreage">
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
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" @click="addSheet(2)">确定</button>
      </div>
 
    </div>
  </div>
</div>
<!-- ------------type=3------------ -->
<div class="modal fade" id="3">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">详细信息(钢加工件)</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
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
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" @click="addSheet(3)">确定</button>
      </div>
 
    </div>
  </div>
</div>
<!-- ------------type=4------------ -->
<div class="modal fade" id="4">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">详细信息(辅助材料)</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
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
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal" @click="addSheet(4)">确定</button>
      </div>
 
    </div>
  </div>
</div>
<!-- -----------附件列表------------- -->

<div class="modal fade" id="files">
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
        <button type="button" class="btn btn-success" data-dismiss="modal">确定</button>
      </div>
 
    </div>
  </div>
</div>
</div>

</template>

<script>
import {lv,gang,jian,fu,ban} from '../../../config/excel_json.js';
import {readExcel} from '../../../config/mUtils.js';
import {baseUrl} from '../../../config/env.js';
import {UPDATEORDER,LOADING_START,LOADING_END}from '../../../store/mutation_types';
import {add_order} from '../../../api/order.js';
import {find_density} from '../../../api/density.js';
export default {
    created(){
        this.init();
    },
    data(){
        return {
           order:{},
           sheet:[],
           newSheet:{},
           rou_tip:'根据型材代号从数据库提取'
        }
    },
    methods:{
        init(){
            this.order=this.$store.state.newOrder;
            this.order.project=this.$route.params.id;
            // this.order.project=this.$store.state.newOrder;
            if(!this.order.title){alert('名称为必填项！');this.$router.go(-1);return;}
        },
        addSheet(num){
            let pass=true;
            $.each($('#'+num+' .mulit'),function(){
                if(!$(this).parent('.form-group').children('input').val()){
                    pass=false;
                }
            })
            if(pass){
                this.sheet.push(this.newSheet);
                this.newSheet={};
            }else{
                alert('请填写必填项！');return;
            }

        },
        start(){
            if($('#0_upload-file')[0].files.length<=0){
                this.finish([]);
                return;
            }
            $('#0_upload-file').fileinput('upload');
        },
        async finish(fileList){
            let res_add_order=await add_order({order:this.order,sheet:this.sheet,files:fileList})
            this.$store.commit(LOADING_END)
            if(res_add_order.data.res==1){
               this.$router.push('step4')
            }else{
                alert(res_add_order.data.text)
            }
        },
        async code_check(e){
            let inputCode=e.srcElement.value;
            this.newSheet.rou='';
            this.rou_tip='查找中...'
            let res=await find_density({code:inputCode});
            if(res.data.res==0){this.rou_tip=res.data.text;return;}
            console.log(res.data.body[0].rou)
            this.newSheet.rou=JSON.parse(JSON.stringify(res.data.body[0].rou));
            this.$refs.inputR.value=res.data.body[0].rou;
        },
        async loadFile(event){
            let result=[];
            console.log('---导入excel---')
            if(!event.srcElement.files[0]){return}
            let data=event.srcElement.files[0];
            this.$store.commit(LOADING_START)
            let res=await readExcel(data);
            this.$store.commit(LOADING_END)
            let sheet=res.Sheets[res.SheetNames[0]];//excel所有数据
            let json=XLSX.utils.sheet_to_json(sheet);//转化成json
            console.log('res',res)
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
                this.sheet.push(stempJson)
            })
            console.log('excel结果:')
            console.log(result)
        }
    },
    computed:{
        excelJson(){
            console.log(this.order.type)
            if(this.order.type===null || this.order.type===''){return ''};
            switch (parseInt(this.order.type)){
                case 0:return lv;break;
                case 1:return gang;break;
                case 2:return ban;break;
                case 3:return jian;break;
                case 4:return fu;break;
                default:return '';break;
            }
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
                _this.finish(data.response.body);
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
<style lang="less" scoped>
@import "../../../assets/css/theme.less";
.selects{
    .btn{
        margin-top:10px
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
.step{
    background-color: #9d9d9d;
    color:#fff;
    position: relative;
    margin-right: 10px;
    padding:3px 0;
}
.active{
    background-color: @cut1;
}
.active::after{
    border-left: 10px solid @cut1 !important;
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
    right:-10px;
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
    border-left: 10px solid #ececec;
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
    border-left: 10px solid #ececec;
}
</style>