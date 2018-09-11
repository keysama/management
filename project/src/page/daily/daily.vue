<template>
  <div class="row toprow align-content-start">
    <div class="col-md-12">
      <div class="col-md-12 text-left title d-flex justify-content-between align-items-center" >
        <h4>施工日志<i class="iconfont icon-add" style="margin-left:10px;cursor:pointer" data-toggle="modal" data-target="#add" v-if="allowAddDaily"></i></h4>
        <h4 v-if="!allowAddDaily">施工日志<i class="iconfont icon-add" style="margin-left:10px;cursor:pointer disabled" ></i></h4>
      </div>
      <div class="col-md-12 timeLine" style="background-color:#fff" v-for="(item,key) in dailyList" :key="key">
          <div class="timeLine-line"></div>
          <div class="timeLine-item" @click="daily(item.id)">
              <div v-if="allowDeleteDaily || item.uid==$store.state.userInfo.id" @click.stop="deleteDaily(item.id)" style="position:absolute;top:10px;right:10px"><i class="iconfont icon-remove2"></i></div>
              <div class="timeLine-item-back"></div>
              <div class="timeLine-itemhead">
                  {{item.title}}
              </div>
              <div class="timeLine-itembody">
                  {{item.content}}
              </div>
              <div class="timeLine-itemfoot">
                  <div style="display:inline-block;width:80px;margin:5px;padding: 2px;border:1px solid #000" v-for="(item2,key2) in item.imgList" :key="key2" v-if="key2<=2"><img :src="daily_url+item2.name" style="width:100%;vertical-align:top"></div>
              </div>
              <div class="timeLine-itemmark">
                {{item.nickname}},{{item.uploadtime | timeFilter}}
              </div>
        </div>
      </div>
    </div>
<!-- 模态框 -->
<div class="modal fade" id="add">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">创建日志</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body">
            <div class="form-group">
                <label >标题</label>
                <input type="text" class="form-control" v-model="uploadTitle">
            </div>
            <div class="form-group">
                <label >内容</label>
                 <textarea class="form-control" rows="3" style="resize:none" v-model="uploadContent"></textarea>
            </div>
            <div class="form-group" > 
                <input id="0_upload-file" type="file" multiple class="file-loading">  
            </div>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
        <button type="button" class="btn btn-success" @click="createDaily">创建</button>
      </div>
 
    </div>
  </div>
</div>

<!-- 模态框 -->
<div class="modal fade" id="details">
  <div class="modal-dialog">
    <div class="modal-content">
 
      <!-- 模态框头部 -->
      <div class="modal-header">
        <h4 class="modal-title">{{selectDaily.title}}</h4>
        <button type="button" class="close" data-dismiss="modal">&times;</button>
      </div>
 
      <!-- 模态框主体 -->
      <div class="modal-body" style="word-break:break-all">
        {{selectDaily.content}}
        <div class="imgArea">
         <img class="data-img" :src="daily_url+item.name" v-for="(item,key) in selectDaily.imgList" :key="key">
        </div>
        <div class="commitArea">
            <div class="ctitle">评论列表</div>
            <ul class="list-group">
            <li class="list-group-item" v-for="(item2,key2) in selectDaily.commentList" :key="key2">{{item2.content}} <span class="editor">{{item2.nickname}}，{{item2.uploadtime | timeFilter}}</span></li>
            </ul>
        </div>
        <div class="replyArea">
            <div class="ctitle">写评论</div>
            <div>
                <textarea class="form-control" rows="3" placeholder="输入评论" v-model="inputComment"></textarea>
            </div>
        </div>
      </div>
 
      <!-- 模态框底部 -->
      <div class="modal-footer">
         <button type="button" class="btn btn-success" @click="uploadComment">发表</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
      </div>
 
    </div>
  </div>
</div>
  </div>
</template>

<script>
import {checkPower} from '../../api/pro.js';
import {daily_url,baseUrl} from '../../config/env.js';
import {create_daily,get_dailyList,delete_daily,add_comment,get_commentList} from '../../api/daily.js';
import {LOADING_START,LOADING_END} from '../../store/mutation_types.js';
export default {
    created(){
        this.init();
    },
    data(){
        return {
            power:'',
            baseUrl:'',
            daily_url:'',
            proId:'',
            uploadTitle:'',
            uploadContent:'',
            dailyList:[],
            selectDaily:{},
            inputComment:''
        }
    },
    methods:{
        async init(){
            this.$store.commit(LOADING_START)
            this.baseUrl=baseUrl;
            this.daily_url=daily_url;
            this.proId=this.$route.params.id;
            let res=await get_dailyList({pro:this.proId})
            let res1=await checkPower({id:this.$route.params.id});
            this.$store.commit(LOADING_END)
            if(res.data.res!=1){alert(res.data.text);return};
            this.power=res1.data.body;
            this.dailyList=res.data.body;
            $("#0_upload-file").fileinput("clear");
            $("#0_upload-file").fileinput("reset");
        },
        async daily(id){
            this.$store.commit(LOADING_START)
            let res=await get_commentList({did:id});
            this.$store.commit(LOADING_END)
            if(res.data.res!=1){alert(res.data.text);return};
            this.selectDaily=this.data = JSON.parse(JSON.stringify(this.dailyList.filter(item=>item.id==id)[0]));
            this.selectDaily.commentList=res.data.body;
            $("#details").modal("show")
        },
        async deleteDaily(id){
            if(!confirm('确认删除？')){return;}
            this.$store.commit(LOADING_START)
            let res=await delete_daily({id:id})
            this.$store.commit(LOADING_END)
            if(res.data.res!=1){alert(res.data.text);return};
            this.init();
        },
        createDaily(){
            if(this.uploadTitle==''&&this.uploadContent==''){alert('请填写标题或内容');return;}
            if($('#0_upload-file')[0].files.length>0){
                 $('#0_upload-file').fileinput('upload');
            }else{
                this.fileUploadHandle({files:[]});
            }
        },
        async fileUploadHandle(files){
            this.$store.commit(LOADING_START)
            let res=await create_daily({project:this.proId,title:this.uploadTitle,content:this.uploadContent,files})
            this.$store.commit(LOADING_END)
            if(res.data.res!=1){alert(res.data.text);return};
            $("#add").modal("hide");
            $("#0_upload-file").fileinput("clear");
            $("#0_upload-file").fileinput("reset");
            this.uploadTitle='';
            this.uploadContent='';
            this.init();
        },
        async uploadComment(){
            this.$store.commit(LOADING_START)
            let res=await add_comment({daily:this.selectDaily.id,content:this.inputComment})
            this.$store.commit(LOADING_END)
            if(res.data.res!=1){alert(res.data.text);return};
            this.daily(res.data.body.did);
            this.inputComment='';
        }
    },
    computed:{
        allowAddDaily(){
            if(this.power===''){return false}
            return this.$store.state.jobList[this.power].indexOf(13)>=0 || this.$store.state.userInfo.type==0;
        },
        allowDeleteDaily(){
            if(this.power===''){return false}
            return this.$store.state.jobList[this.power].indexOf(23)>=0 || this.$store.state.userInfo.type==0;
        }
    },
    filters:{
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
            uploadUrl: baseUrl+'api/file/comment', //上传的地址
            allowedFileExtensions: ['jpg','png','gif','jpeg'],//接收的文件后缀
            showCaption: false,//是否显示标题
            browseClass: "btn btn-primary", //按钮样式     
            dropZoneEnabled: false,//是否显示拖拽区域
            showRemove:false,//是否显示remove按钮
            showUpload:false,//是否显示upload按钮
            showClose:false,//是否显示关闭按钮
            showCancel:false,//是否显示取消按钮
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
                _this.fileUploadHandle(data.response.body);
          
            }else{
                alert("上传失败!");
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
.krajee-default{
    .file-preview-frame{
        background-color: red;
    }
}
.action-img{
    background-color: #e03232
}
#details{
    .replyArea{
        margin-top:10px;
        padding-top:10px;
        textarea{
            resize: none;
        }
        .ctitle{
            margin-bottom:10px;
        }
    }
    .commitArea{
        position: relative;
        margin-top:10px;
        padding-top:10px;
        border-top:1px solid #ececec;
    
        .ctitle{
            margin-bottom:10px;
        }
        .editor{
            position: absolute;
            bottom:2px;
            right:5px;
            font-size: 10px;
        }
        .list-group-item{
            word-break: break-all;
             padding-bottom: 25px;
        }
    }
    .imgArea{
        margin-top:10px;
        padding-top:10px;
        border-top:2px solid #ececec;
        text-align: left;
        img{
            width:46%;
            border:2px solid #000;
            margin: 2px;
        }
    }

}
.timeLine{
    position: relative;
    padding-top:20px;
    padding-bottom:30px;
    .timeLine-itemhead{
        font-size: 14px;
        border-bottom: 1px solid #ececec;
        padding-bottom: 5px;
        word-break: break-all;
    }
    .timeLine-itembody{
        padding-left: 10px;
        padding-top: 5px;
        word-break: break-all;
    }
    .timeLine-itemmark{
        position: absolute;
        bottom:2px;
        font-size: 12px;
        right:10px;
    }
    .timeLine-line{
        position: absolute;
        top:0;
        left: 0;
        height: 100%;
        width: 5px;
        background-color: @cut2;
        border-radius: 5px;
    }
    .timeLine-item{
        max-width: 650px;
        position: relative;
        background-color: #fff;
        margin-bottom: 20px;
        padding:10px 20px 20px 20px;
        border:1px solid @cut2;
        box-shadow: 2px 5px 10px #9d9d9d;
        border-radius: 8px;
    }
    .timeLine-item-back::before{
        content: '';
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #fff;
        border:2px solid @cut2;
        border-radius: 50%;
        top:calc(50% - 5px);
        left:-18px;
        z-index: 1;
    }
    .timeLine-item-back::after{
        content: '';
        position: absolute;
        width: 15px;
        height: 4px;
        background-color: #fff;
        border:1px solid @cut2;
        z-index: 0;
        top:calc(50% - 2px);
        left:-15px;
    }
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

.toprow{
  min-height: 600px;
  padding:0 5px;
  .box{
    background-color: #fff;
    margin-bottom:15px;
    padding:10px 20px;
  }
}


</style>
