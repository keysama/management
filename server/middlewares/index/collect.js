const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');
module.exports={
    async total(req,res,next){
        let project=req.body.pro;

        let orders=[];

        let order_sheet_lv=[];
        let order_sheet_gang=[];
        let order_sheet_ban=[];
        let order_sheet_jian=[];
        let order_sheet_fu=[];
//第一步获取项目下所有订单的id,type,processing
        let sql1='SELECT id,type,processing FROM `order` WHERE project='+project;
        let res1=await myPro(sql1);
        if(res1===666){sendError.error(req,res,'数据库查询失败');return}
        orders=res1;
//第二步获取各个类型订单的提料单
        for(let key=0;key<orders.length;key++){
            let item=orders[key];
            let sql2=`SELECT * FROM ${orderType(item.type)} WHERE oid=${item.id}`;
            let res2=await myPro(sql2);
            if(res2===666){sendError.error(req,res,'数据库查询失败');return}
            switch(item.type){
                case 0:
                res2.forEach(item2=>{
                    order_sheet_lv.push(item2)
                });break;
                case 1:
                 res2.forEach(item2=>{
                    order_sheet_gang.push(item2)
                });break;
                 case 2:
                 res2.forEach(item2=>{
                    order_sheet_ban.push(item2)
                });break;
                 case 3:
                 res2.forEach(item2=>{
                    order_sheet_jian.push(item2)
                });break;
                 case 4:
                 res2.forEach(item2=>{
                    order_sheet_fu.push(item2)
                });break;
                 default :console.log('none');break;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            }
        }
//第三步获取到货的订单和提料单
        let finish_orders=orders.filter(item=>(item.processing!='' && item.processing.split(';')[0]=='6'));
        let finish_order_sheet_lv=[];
        let finish_order_sheet_gang=[];
        let finish_order_sheet_ban=[];
        let finish_order_sheet_jian=[];
        let finish_order_sheet_fu=[];
        finish_orders.forEach(item=>{
            switch(item.type){
                case 0:
                order_sheet_lv.forEach(item2=>{
                    if(item2.oid==item.id){
                        finish_order_sheet_lv.push(item2)
                    }
                });break;
                case 1:
                order_sheet_gang.forEach(item2=>{
                    if(item2.oid==item.id){
                        finish_order_sheet_gang.push(item2)
                    }
                });break;
                 case 2:
                order_sheet_ban.forEach(item2=>{
                    if(item2.oid==item.id){
                        finish_order_sheet_ban.push(item2)
                    }
                });break;
                 case 3:
                order_sheet_jian.forEach(item2=>{
                    if(item2.oid==item.id){
                        finish_order_sheet_jian.push(item2)
                    }
                });break;
                 case 4:
                order_sheet_fu.forEach(item2=>{
                    if(item2.oid==item.id){
                        finish_order_sheet_fu.push(item2)
                    }
                });break;
                 default :console.log('none');break;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
            }
        })
//第3.5步，获取所有预计
        let sql6=`SELECT * from yuji_lv WHERE pid=${project}`;
        let res6=await myPro(sql6);
        if(res6===666){sendError.error(req,res,'数据库查询失败');return}

        let sql7=`SELECT * from yuji_gang WHERE pid=${project}`;
        let res7=await myPro(sql7);
        if(res7===666){sendError.error(req,res,'数据库查询失败');return}

        let sql8=`SELECT * from yuji_ban WHERE pid=${project}`;
        let res8=await myPro(sql8);
        if(res8===666){sendError.error(req,res,'数据库查询失败');return}

        let sql9=`SELECT * from yuji_jian WHERE pid=${project}`;
        let res9=await myPro(sql9);
        if(res9===666){sendError.error(req,res,'数据库查询失败');return}

        let yuji_lv=res6;
        let yuji_gang=res7;
        let yuji_ban=res8;
        let yuji_jian=res9;


//第四步,每个提料单名称、提料总量
let list_lv=[];
order_sheet_lv.forEach(item=>{
    let con=true;
    list_lv.forEach((item2,key2)=>{
        if(item2.name==item.name && item2.code==item.code){
            list_lv[key2].total=parseFloat(list_lv[key2].total)+parseFloat(item.num*item.rou*item['length']);
            con=false;
        }
    })
    if(con){
        let finish_tmp=finish_order_sheet_lv.filter(item2=>(item2.name==item.name && item2.code==item.code));
        let finish_all=0;
        if(finish_tmp.length>0){
            finish_all=finish_tmp.reduce(function(a,b){
                return a+parseFloat(b.num*b.rou*b['length'])
            },0)
        }
        let yuji_tmp=yuji_lv.filter(item2=>(item2.name==item.name && item2.code==item.code));
        let yuji_all=0;
        if(yuji_tmp.length>0){
            yuji_all=parseFloat(yuji_tmp[0].value)
        }
        list_lv.push({
            name:item.name,
            code:item.code,
            total:parseFloat(item.num*item.rou*item['length']).toFixed(3),
            finish:finish_all,
            yuji:yuji_all
        })  
    }
})


let list_gang=[];
order_sheet_gang.forEach(item=>{
    let con=true;
    list_gang.forEach((item2,key2)=>{
        if(item2.name==item.name && item2.standard==item.standard){
            list_gang[key2].total=parseFloat(list_gang[key2].total)+parseFloat(item.num*item.rou*item['length']);
            con=false;
        }
    })
    if(con){
        let finish_tmp=finish_order_sheet_gang.filter(item2=>(item2.name==item.name && item2.standard==item.standard));
        let finish_all=0;
        if(finish_tmp.length>0){
            finish_all=finish_tmp.reduce(function(a,b){
                return a+parseFloat(b.num*b.rou*b['length'])
            },0)
        };
        let yuji_tmp=yuji_gang.filter(item2=>(item2.name==item.name && item2.code==item.standard));
        let yuji_all=0;
        if(yuji_tmp.length>0){
            yuji_all=parseFloat(yuji_tmp[0].value)
        };
        list_gang.push({
            name:item.name,
            standard:item.standard,
            total:parseFloat(item.num*item.rou*item['length']).toFixed(3),
            finish:finish_all,
            yuji:yuji_all
        })
    }
})


let list_ban=[];
order_sheet_ban.forEach((item,key)=>{
    let con=true;
    list_ban.forEach((item2,key2)=>{
        if(item2.name==item.name && item2.codehead==item.codehead && item2.code==item.code){
            list_ban[key2].total=parseFloat(list_ban[key2].total)+parseFloat(item.num*item.acreage);
            con=false;
        }
    })
    if(con){
        let finish_tmp=finish_order_sheet_ban.filter(item2=>(item2.name==item.name && item2.codehead==item.codehead && item2.code==item.code));
        let finish_all=0;
        if(finish_tmp.length>0){
            finish_all=finish_tmp.reduce(function(a,b){
                return a+parseFloat(b.num*b.acreage)
            },0)
        };
        if(item.codehead==null){
            order_sheet_ban[key].codehead='null'
        }
        let yuji_tmp=yuji_ban.filter(item2=>(item2.name==item.name && item2.codehead==item.codehead && item2.code==item.code));
        let yuji_all=0;
        if(yuji_tmp.length>0){
            yuji_all=parseFloat(yuji_tmp[0].value)
        };
        list_ban.push({
            name:item.name,
            codehead:item.codehead,
            code:item.code,
            total:parseFloat(item.num*item.acreage).toFixed(3),
            finish:finish_all,
            yuji:yuji_all
        })
    }
})


let list_jian=[];
order_sheet_jian.forEach(item=>{
    let con=true;
    list_jian.forEach((item2,key2)=>{
        if(item2.name==item.name && item2.code==item.code){
            list_jian[key2].total=parseFloat(list_jian[key2].total)+parseFloat(item.num*item.weight);
            con=false;
        }
    })
    if(con){
        let finish_tmp=finish_order_sheet_jian.filter(item2=>(item2.name==item.name && item2.code==item.code));
        let finish_all=0;
        if(finish_tmp.length>0){
            finish_all=finish_tmp.reduce(function(a,b){
                return a+parseFloat(b.num*b.weight)
            },0)
        };
        let yuji_tmp=yuji_jian.filter(item2=>(item2.name==item.name && item2.code==item.code));
        let yuji_all=0;
        if(yuji_tmp.length>0){
            yuji_all=parseFloat(yuji_tmp[0].value)
        };
        list_jian.push({
            code:item.code,
            name:item.name,
            total:parseFloat(item.num*item.weight).toFixed(3),
            finish:finish_all,
            yuji:yuji_all                                                                         
        })
    }
})



//第五步，整理数据
let jsonStemp={};
jsonStemp.lv={
    yuji:0,
    totle:list_lv.reduce(function(totle,value){
        return totle+parseFloat(value.total)
    },0),
    list:list_lv,
    finish:list_lv.reduce(function(totle,value){
        return totle+parseFloat(value.finish)
    },0)
}
jsonStemp.gang={
    yuji:0,
    totle:list_gang.reduce(function(totle,value){
        return totle+parseFloat(value.total)
    },0),
    list:list_gang,
    finish:list_gang.reduce(function(totle,value){
        return totle+parseFloat(value.finish)
    },0)
}
jsonStemp.ban={
    yuji:0,
    totle:list_ban.reduce(function(totle,value){
        return totle+parseFloat(value.total)
    },0),
    list:list_ban,
    finish:list_ban.reduce(function(totle,value){
        return totle+parseFloat(value.finish)
    },0)
}
jsonStemp.jian={
    yuji:0,
    totle:list_jian.reduce(function(totle,value){
        return totle+parseFloat(value.total)
    },0),
    list:list_jian,
    finish:list_jian.reduce(function(totle,value){
        return totle+parseFloat(value.finish)
    },0)
}

res.body=jsonStemp;
next()


    },
    async save(req,res,next){
        let pid=req.body.pid;
        let lv=req.body.total.lv.list;
        let gang=req.body.total.gang.list;
        let ban=req.body.total.ban.list;
        let jian=req.body.total.jian.list;
//第一步查询所有的预计

        let sql2=`SELECT * from yuji_lv WHERE pid=${pid}`;
        let res2=await myPro(sql2);
        if(res2===666){sendError.error(req,res,'数据库查询失败');return}

        let sql3=`SELECT * from yuji_gang WHERE pid=${pid}`;
        let res3=await myPro(sql3);
        if(res3===666){sendError.error(req,res,'数据库查询失败');return}

        let sql4=`SELECT * from yuji_ban WHERE pid=${pid}`;
        let res4=await myPro(sql4);
        if(res4===666){sendError.error(req,res,'数据库查询失败');return}

        let sql5=`SELECT * from yuji_jian WHERE pid=${pid}`;
        let res5=await myPro(sql5);
        if(res5===666){sendError.error(req,res,'数据库查询失败');return}

        let yuji_lv=res2;
        let yuji_gang=res3;
        let yuji_ban=res4;
        let yuji_jian=res5;

//第二布，插入或更新

        for(let i=0;i<lv.length;i++){
            let item=lv[i];
            if(yuji_lv.filter(item2=>(item2.name==item.name && item2.code==item.code)).length>0){
                if(yuji_lv.filter(item2=>(item2.name==item.name && item2.code==item.code && item2.value!=item.yuji)).length>0){
                    let sql1=`UPDATE yuji_lv SET value='${item.yuji}' WHERE pid=${pid} AND name='${item.name}' AND code='${item.code}'`;
                    let res1=await myPro(sql1);
                    if(res1===666){sendError.error(req,res,'数据库查询失败');return}  
                }
            }else{
                let sql1=`INSERT INTO yuji_lv (pid,name,code,value) VALUES (${pid},'${item.name}','${item.code}','${item.yuji}')`;
                let res1=await myPro(sql1);
                if(res1===666){sendError.error(req,res,'数据库查询失败');return}
            }
        }
        for(let i=0;i<gang.length;i++){
            let item=gang[i];
            if(yuji_gang.filter(item2=>(item2.name==item.name && item2.code==item.standard)).length>0){
                if(yuji_gang.filter(item2=>(item2.name==item.name && item2.code==item.standard && item2.value!=item.yuji)).length>0){
                    let sql1=`UPDATE yuji_gang SET value='${item.yuji}' WHERE pid=${pid} AND name='${item.name}' AND code='${item.standard}'`;
                    let res1=await myPro(sql1);
                    if(res1===666){sendError.error(req,res,'数据库查询失败');return}  
                }
            }else{
                let sql1=`INSERT INTO yuji_gang (pid,name,code,value) VALUES (${pid},'${item.name}','${item.standard}','${item.yuji}')`;
                let res1=await myPro(sql1);
                if(res1===666){sendError.error(req,res,'数据库查询失败');return}
            }
        }
        for(let i=0;i<ban.length;i++){
            let item=ban[i];
            if(item.codehead==null){
                item.codehead='null';
            }
            if(yuji_ban.filter(item2=>(item2.name==item.name && item2.code==item.code && item2.codehead==item.codehead)).length>0){
                console.log(yuji_ban)
                console.log(item.yuji)
                if(yuji_ban.filter(item2=>(item2.name==item.name && item2.code==item.code && item2.codehead==item.codehead && item2.value!=item.yuji)).length>0){
                    let sql1=`UPDATE yuji_ban SET value='${item.yuji}' WHERE pid=${pid} AND name='${item.name}' AND code='${item.code}' AND codehead='${item.codehead}'`;
                    let res1=await myPro(sql1);
                    if(res1===666){sendError.error(req,res,'数据库查询失败');return}  
                }
            }else{
                let sql1=`INSERT INTO yuji_ban (pid,name,code,codehead,value) VALUES (${pid},'${item.name}','${item.code}','${item.codehead}','${item.yuji}')`;
                let res1=await myPro(sql1);
                if(res1===666){sendError.error(req,res,'数据库查询失败');return}
            }
        }
        for(let i=0;i<jian.length;i++){
            let item=jian[i];
            if(yuji_jian.filter(item2=>(item2.name==item.name && item2.code==item.code)).length>0){
                if(yuji_jian.filter(item2=>(item2.name==item.name && item2.code==item.code && item2.value!=item.yuji)).length>0){
                    let sql1=`UPDATE yuji_jian SET value='${item.yuji}' WHERE pid=${pid} AND name='${item.name}' AND code='${item.code}'`;
                    let res1=await myPro(sql1);
                    if(res1===666){sendError.error(req,res,'数据库查询失败');return}  
                }
            }else{
                let sql1=`INSERT INTO yuji_jian (pid,name,code,value) VALUES (${pid},'${item.name}','${item.code}','${item.yuji}')`;
                let res1=await myPro(sql1);
                if(res1===666){sendError.error(req,res,'数据库查询失败');return}
            }
        }
        let sql8=`INSERT INTO news (pid,text,time) VALUES (${pid},'${req.session.user.nickname+"更新了预算"}','${Date.now()}')`;
        let res8=await myPro(sql8);
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
