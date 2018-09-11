const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');

module.exports={
	async global(req,res,next){
        let text=req.body.text;

        let results={
            project:[],
            order:[],
            sheet:{
                lv:[],
                gang:[],
                ban:[],
                jian:[],
                fu:[]
            }
        };

//第一步，搜索相关项目
        let sql1=`SELECT * FROM pro WHERE CONCAT(name,number,address,yezhu,design,danwei,mdanwei,introduce) LIKE '%${text}%'`;
        let res1=await myPro(sql1);
        if(res1===0){sendError.error(req,res,'数据库查询失败');return};
        results.project=res1;
//第二步，搜索相关订单
        let sql2=`SELECT * FROM `+'`order`'+` WHERE CONCAT(title,position,target_position,specifications,remark) LIKE '%${text}%'`;
        let res2=await myPro(sql2);
        if(res2===0){sendError.error(req,res,'数据库查询失败');return};
        results.order=res2;
//第三步，搜索相关提料单
        let sql3=`SELECT order_sheet_lv.*,(SELECT project FROM `+'`order`'+` WHERE order.id=order_sheet_lv.oid)pid FROM order_sheet_lv WHERE CONCAT(name,code,quality,dispose,color,remark) LIKE '%${text}%'`;
        let sql4=`SELECT order_sheet_gang.*,(SELECT project FROM `+'`order`'+` WHERE order.id=order_sheet_gang.oid)pid FROM order_sheet_gang WHERE CONCAT(name,standard,quality,dispose,remark) LIKE '%${text}%'`;
        let sql5=`SELECT order_sheet_ban.*,(SELECT project FROM `+'`order`'+` WHERE order.id=order_sheet_ban.oid)pid FROM order_sheet_ban WHERE CONCAT(name,codehead,code,number,remark) LIKE '%${text}%'`;
        let sql6=`SELECT order_sheet_jian.*,(SELECT project FROM `+'`order`'+` WHERE order.id=order_sheet_jian.oid)pid FROM order_sheet_jian WHERE CONCAT(name,code,dispose,number,remark) LIKE '%${text}%'`;
        let sql7=`SELECT order_sheet_fu.*,(SELECT project FROM `+'`order`'+` WHERE order.id=order_sheet_fu.oid)pid FROM order_sheet_fu WHERE CONCAT(name,standard,quality,brand,unit,remark) LIKE '%${text}%'`;
        let res3=await myPro(sql3);
        if(res3===0){sendError.error(req,res,'数据库查询失败');return};
        let res4=await myPro(sql4);
        if(res4===0){sendError.error(req,res,'数据库查询失败');return};
        let res5=await myPro(sql5);
        if(res5===0){sendError.error(req,res,'数据库查询失败');return};
        let res6=await myPro(sql6);
        if(res6===0){sendError.error(req,res,'数据库查询失败');return};
        let res7=await myPro(sql7);
        if(res7===0){sendError.error(req,res,'数据库查询失败');return};
        results.sheet['lv']=res3;
        results.sheet['gang']=res4;
        results.sheet['ban']=res5;
        results.sheet['jian']=res6;
        results.sheet['fu']=res7;

        res.body=results;
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