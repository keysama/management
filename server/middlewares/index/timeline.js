const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');

module.exports={
	async list(req,res,next){
		let pid=req.body.pid;
		let sql1=`SELECT * FROM news WHERE pid=${pid} ORDER BY id desc`;
	
		let res1=await myPro(sql1);

		if(res1===0){sendError.error(req,res,'查询失败');return}
		res.body=res1;
		next();
	}
}

function myPro(sql){
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