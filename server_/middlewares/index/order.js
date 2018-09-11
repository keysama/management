const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');

module.exports={
	async add(req,res,next){
        let orderInfo=req.body.order;
        let sheetList=req.body.sheet;
        let fileList=req.body.files;
//添加order
        let sql1="INSERT INTO `order`("
        let keys='';
        let values='';
        Object.keys(orderInfo).forEach(item=>{
            keys=keys+item+",";
            if(item=='type' || item=='project'){
                values=values+orderInfo[item]+',';
            }else{
                values=values+"'"+orderInfo[item]+"',";
            }  
        })
        keys=keys+"timestemp,user";
        values=values+`'${Date.now() }','${req.session.user.id}'`;
        sql1=sql1+keys+') VALUES('+values+')';
        let res1=await myPro(sql1);
        if(res1==0){sendError.error(req,res,'数据库插入失败');return}

//获得oid，添加提料列表,res1.insertId
        for(let i =0;i<sheetList.length;i++){
            let sql2="INSERT INTO "+orderType(orderInfo.type)+"(";
            let keys2='';
            let values2='';
            Object.keys(sheetList[i]).forEach(item2=>{
                keys2=keys2+item2+",";
                values2=values2+"'"+sheetList[i][item2]+"',";
            })
            keys2=keys2+"oid";
            values2=values2+`'${res1.insertId}'`;
            sql2=sql2+keys2+') VALUES('+values2+')';
            let res2=await myPro(sql2);
            if(res2==0){sendError.error(req,res,'数据库插入失败');return}
            console.log('向订单'+res1.insertId+'添加提料单:'+res2.insertId)
        }
//添加order的附件
        let fileList_str='';
        fileList.forEach(item=>{
            fileList_str+=`(${res1.insertId},'${item}',${req.session.user.id},'${Date.now()}'),`
        })
        fileList_str=fileList_str.substring(0,fileList_str.length-1)
        let sql3=`INSERT INTO order_files (oid,name,uploader,uploadtime) VALUES ${fileList_str}`;
        let res3=await myPro(sql3);
        if(res3===0){sendError.error(req,res,'附件添加失败');return}
        next();
    },
    async list(req,res,next){
        let project=req.query.pro;
//获取订单列表
        let sql='SELECT * FROM `order` WHERE project='+project;
        let res1=await myPro(sql);
        if(res1==0){sendError.error(req,res,'数据库查询失败');return}
//获取提料单列表
        for(let i=0;i<res1.length;i++){
            let sql2='SELECT count(*) FROM '+orderType(res1[i].type)+' WHERE oid='+res1[i].id;
            let res2=await myPro(sql2);
            if(res2==0){sendError.error(req,res,'数据库查询失败');return}
            res1[i].sheetNum=res2[0]['count(*)'];
        }
        res.orderList=res1;       
        next();
    },
    async edit(req,res,next){
        let order=req.body;
        let sql='UPDATE `order` SET ';
        sql=sql+`title='${order.title}',position='${order.position}',target_position='${order.target_position}',specifications='${order.specifications}',remark='${order.remark}'`;
        sql=sql+' WHERE id='+order.id;
        let res1=await myPro (sql);
        if(res1==0){sendError.error(req,res,'修改失败');return}
        console.log('用户'+req.session.user.nickname+'修改了订单：'+order.id);
        next()
    },
    async delete(req,res,next){
        let order=req.body.order;
        let sql='DELETE FROM `order` WHERE id='+order;
        let res1=await myPro(sql);
        if(res1==0){sendError.error(req,res,'删除失败');return}
        console.log('用户'+req.session.user.nickname+'删除了订单：'+order);
        next();
    },
    async addFile(req,res,next){
        let order=req.body.order;
        let files=req.body.files;
        let files_str='';
        for(let key=0;key<files.length;key++){
            let item=files[key];
            files_str+=`(${order},'${item}',${req.session.user.id},'${Date.now()}'),`
        }
        files_str=files_str.substring(0,files_str.length-1);
        let sql1=`INSERT INTO order_files (oid,name,uploader,uploadtime) VALUES ${files_str}`;
        let res1=await myPro(sql1);
        if(res1==0){sendError.error(req,res,'添加失败');return}
        next();
    },
    async getWorkers(req,res,next){
        let pro=req.body.pro;
        let sql1=`SELECT pro_user.job,user.nickname,user.id FROM pro_user LEFT JOIN user on user.id=pro_user.member WHERE pro=${pro} AND state=1 AND member!=${req.session.user.id}`;
        let res1=await myPro(sql1);
        if(res1===0){sendError.error(req,res,'获取人员列表失败');return}
        res.body=res1;
        next();
    },
    async examine(req,res,next){
//type:0表示提交审核（第一阶段）
//type:1表示提交订单（第二阶段）
        let type=req.body.type;
        let uid=req.body.uid;
        let order=req.body.order;
        res.body={};
//获取审核人昵称
        let sql1=`SELECT nickname FROM user WHERE id=${uid}`;
        let res1=await myPro(sql1);
        if(res1===0){sendError.error(req,res,'上传信息失败');return}
        res.body.nickname=res1[0].nickname;
//插入审核字段
        let str='';
        if(type==1){
            str='4;'+res1[0].nickname+';'+Date.now();
        }else{
            str='1;'+res1[0].nickname+';'+Date.now();
        }
        let sql2='UPDATE `order` SET processing'+`='${str}',auditor=${uid} WHERE id=${order}`;
        let res2=await myPro(sql2);
        if(res2===0){sendError.error(req,res,'上传信息失败');return}
        next();
    },
    async examineBack(req,res,next){
        let order=req.body.order;
        let sql1='UPDATE `order` SET '+`processing='',auditor=null WHERE id=${order}`;
        let res1=await myPro(sql1);
        if(res1===0){sendError.error(req,res,'数据库查询失败');return}
        next();
    },
    async sendAllow(req,res,next){
        let type=req.body.type;
        let order=req.body.id;
        let sql1='';
        if(type==0){
            sql1='UPDATE `order` SET '+`processing='3;${req.session.user.nickname};${Date.now()}',auditor=null WHERE id=${order}`;
        }else{
            sql1='UPDATE `order` SET '+`processing='6;${req.session.user.nickname};${Date.now()}' WHERE id=${order}`;  
        }
        let res1=await myPro(sql1);
        if(res1===0){sendError.error(req,res,'数据库查询失败');return}
        next();

    },
    async sendBack(req,res,next){
        let type=req.body.type;
        let order=req.body.id;
        let sql1='';
        if(type==0){
            sql1='UPDATE `order` SET '+`processing='2;${req.session.user.nickname};${Date.now()}',auditor=null WHERE id=${order}`;
        }else{
            sql1='UPDATE `order` SET '+`processing='5;${req.session.user.nickname};${Date.now()}',auditor=null WHERE id=${order}`;
        }
        let res1=await myPro(sql1);
        if(res1===0){sendError.error(req,res,'数据库查询失败');return}
        next();
    }
}

function myPro (sql){
    return new Promise(function(resolve, reject) {
           db(sql, function(error,results){
            if(error){
                console.log(error)
                reject(0)
            }else{
                resolve(results)
            }
        })
    });
}

function orderType(type){
    switch(type){
        case 0:return 'order_sheet_lv';break;
        case 1:return 'order_sheet_gang';break;
        case 2:return 'order_sheet_ban';break;
        case 3:return 'order_sheet_jian';break;
        case 4:return 'order_sheet_fu';break;
    }
}