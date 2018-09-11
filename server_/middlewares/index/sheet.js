const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');

module.exports={
    async info(req,res,next){
        let order=req.query.order;
//获取订单信息      
        let sql='SELECT * from `order` WHERE id='+order;
        let res1=await myPro(sql);
        if(res1==666){sendError.error(req,res,'数据库查询失败');return}
//获取提料单信息
        let sql2=`SELECT * from ${orderType(res1[0].type)} WHERE oid=`+order;
        let res2=await myPro(sql2);
        if(res2==666){sendError.error(req,res,'数据库查询失败');return}
//获取用户信息
        let sql3=`SELECT id,nickname FROM user WHERE id=`+res1[0].user;
        let res3=await myPro(sql3);
        if(res3==666){sendError.error(req,res,'数据库查询失败');return}
//获取附件列表
        let sql4=`SELECT order_files.*,user.nickname uploader_nickname FROM order_files LEFT JOIN user on user.id=order_files.uploader WHERE oid=${order}`;
        let res4=await myPro(sql4);
        if(res4==666){sendError.error(req,res,'数据库查询失败');return}

        res1[0].fileList=res4;
        res1[0].holder=res3[0];
        res1[0].sheetList=res2;
        res.orderInfo=res1[0];
        next();
    },
    async delete(req,res,next){
        let sheet=req.body.sheet;
        let type=req.body.type;
        let sql=`DELETE FROM ${orderType(type)} WHERE id=${sheet}`;
        let res1=await myPro(sql);
        if(res1==666){sendError.error(req,res,'数据库查询失败');return}
        console.log(`用户${req.session.user.nickname}删除了提料单：${sheet}`)
        next();
    },
    async edit(req,res,next){
        let sheet=req.body.sheet;
        let type=req.body.type;
        let id=sheet.id;
        delete sheet.id;
        delete sheet.oid;
        let sql=`UPDATE ${orderType(type)} SET `;
        Object.keys(sheet).forEach(item=>{
            if(sheet[item]!=null && sheet[item]!=''){
                sql=sql+item+'="'+sheet[item]+'",'
            }
        })
        sql=sql.substring(0,sql.length-1);
        sql=sql+" WHERE id="+id;
        let res1=await myPro(sql);
        if(res1==666){sendError.error(req,res,'数据库查询失败');return}
        console.log(`用户${req.session.user.nickname}修改了提料单：${id}`)
        next()
    },
    async add(req,res,next){
        let order=req.body.id,
        type=req.body.type,
        sheet=req.body.sheet;
        sheet.oid=order;
        sql_keys='';
        sql_values='';

        Object.keys(sheet).forEach(item=>{
            if(sheet[item]!=null && sheet[item]!=''){
                sql_keys=sql_keys+`${item},`;
                sql_values=sql_values+`'${sheet[item]}',`;
            }
        })

        sql_keys=sql_keys.substring(0,sql_keys.length-1);
        sql_values=sql_values.substring(0,sql_values.length-1);

        let sql=`INSERT INTO ${orderType(parseInt(type))} (${sql_keys}) VALUES (${sql_values})`;
        let res1=await myPro(sql);
        if(res1==666){sendError.error(req,res,'数据库查询失败');return}
        sheet.id=res1.insertId;
        res.newSheet=sheet;
         console.log(`用户${req.session.user.nickname}添加了提料单：${sheet.id}`)
        next();
    }
}

function myPro (sql){
    return new Promise(function(resolve, reject) {
           db(sql, function(error,results){
            if(error){
                console.log(error)
                reject(666)
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