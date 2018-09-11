const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');

module.exports={
	async add(req,res,next){
        let {pid,name,code,rou}=req.body;
        let sql1=`INSERT INTO rou_lv (pid,uid,name,code,rou,uploadtime) VALUES (${pid},${req.session.user.id},'${name}','${code}','${rou}','${Date.now()}')`;
        let res1=await myPro(sql1);
        if(res1==0){sendError.error(req,res,'数据库插入失败');return}
        next();
    },
    async list(req,res,next){
        let pid=req.body.pid;
        let sql1=`SELECT * FROM rou_lv WHERE pid=${pid}`;
        let res1=await myPro(sql1);
        if(res1==0){sendError.error(req,res,'数据库插入失败');return}
        res.body=res1;
        next();
    },
    async delete(req,res,next){
        let id=req.body.density;
        let sql1=`DELETE FROM  rou_lv WHERE id=${id}`;
        let res1=await myPro(sql1);
        if(res1==0){sendError.error(req,res,'删除失败');return}
        res.body=res1;
        next();
    },
    async find(req,res,next){
        let code=req.body.code;
        let sql1=`SELECT rou FROM rou_lv WHERE code='${code}'`;
        let res1=await myPro(sql1);
        if(res1==0){sendError.error(req,res,'无该型号的密度,请手动填写');return}
        res.body=res1;
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