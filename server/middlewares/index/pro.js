const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');

module.exports={
	async add(req,res,next){
		let {name,number,address,danwei,design,introduce,mdanwei,members,yezhu}=req.body;
        let time=Date.now();
        let sql=`INSERT INTO pro (name,number,address,danwei,design,introduce,mdanwei,yezhu,createtime) VALUES ('${name}','${number}','${address}','${danwei}','${design}','${introduce}','${mdanwei}','${yezhu}','${time}')`
        let res1=await myPro(sql);
        if(res1==0){sendError.error(req,res,'数据库查询失败');return}
        let sql2=`INSERT INTO pro_user (pro,member,job,state) VALUES `;
        members.forEach(item=>{
            sql2=sql2+`(${res1.insertId},${item.id},${item.job},${item.job==0?1:0}),`
        });
        sql2=sql2.substring(0,sql2.length-1);
        let res2=await myPro(sql2);
        if(res2==0){sendError.error(req,res,'数据库查询失败');return}
        res.pid=res1.insertId;

        let sql3=`INSERT INTO news (pid,text,time) VALUES (${res1.insertId},'${req.session.user.nickname+"创建了工程:"+name}','${Date.now()}')`;
        let res3=await myPro(sql3);

        next();
    },
    async edit(req,res,next){
        let {name,number,address,danwei,design,introduce,mdanwei,id,yezhu}=req.body;
        let res1=await myPro(`UPDATE pro SET name='${name}',number='${number}',address='${address}',danwei='${danwei}',design='${design}',introduce='${introduce}',mdanwei='${mdanwei}',yezhu='${yezhu}' WHERE id=${id}`);
        if(res1==0){sendError.error(req,res,'修改失败');return;}

        let sql3=`INSERT INTO news (pid,text,time) VALUES (${id},'${req.session.user.nickname+"修改了工程"}','${Date.now()}')`;
        let res3=await myPro(sql3);

        next();
    },
    count(req,res,next){
        let user=req.session.user.id;
        let sql=`SELECT count(*) from pro_user WHERE member=${user} AND state=1`;
        db(sql, function(error,results){
            if(error){
                sendError.error(req,res,'数据库查询失败');
            }else{
                res.count=results[0]['count(*)'];
                next();
            }
        })
    },
    all(req,res,next){
        let user=req.session.user.id;
        let sql=`SELECT * FROM pro_user left join pro on pro_user.pro=pro.id WHERE member=${user} AND state=1`;
        db(sql, function(error,results){
            if(error){
                console.log(error)
                sendError.error(req,res,'数据库查询失败');
            }else{
                res.pros=results;
                next();
            }
        })
    },
    checkPower(req,res,next){
        let user=req.session.user.id;
        let id=req.body.id;
        let sql=`SELECT job FROM pro_user WHERE pro=${id} AND member=${user} AND state=1`;
        db(sql, function(error,results){
            if(error){
                console.log(error)
                sendError.error(req,res,'权限校验失败');
            }else{
                if(results.length<=0){
                    sendError.error(req,res,'没有权限查看');return;
                }
                res.power=results[0].job;
                next();
            }
        })
    },
    info(req,res,next){
        let user=req.session.user.id;
        let id=req.body.id;
        let sql=`SELECT * FROM pro WHERE id=${id}`;
        db(sql, function(error,results){
            if(error){
                sendError.error(req,res,'获取信息失败');
            }else{
                res.info=results[0];
                next();
            }
        })
    },
    members(req,res,next){
        let id=req.body.id;
        let sql=`SELECT pro_user.job,pro_user.state,pro_user.jointime,user.id,user.username,user.nickname,user.phone,user.departments FROM pro_user left join user on pro_user.member=user.id WHERE pro=${id}`;
        db(sql, function(error,results){
            if(error){
                console.log(error)
                sendError.error(req,res,'获取用户列表失败');
            }else{
                res.members=results;
                next();
            }
        })
    },
    async membersEdit(req,res,next){
        let members=req.body.members;
        let id=req.body.id;
        console.log(members)
        let del=await myPro(`DELETE FROM pro_user WHERE pro=${id}`);
        if(del==0){sendError.error(req,res,'修改失败');return}
        let sql=`INSERT INTO pro_user (pro,member,job,state,jointime) VALUES `;
        members.forEach(item=>{
            item.jointime=item.jointime==''?'0':item.jointime;
            sql=sql+`(${id},${item.id},${item.job},${item.state},${item.state}),`
        })
        sql=sql.substring(0,sql.length-1);
        let res2=await myPro(sql);
        if(res2==0){sendError.error(req,res,'修改失败');return}
        next();
    },
    async details(req,res,next){
        let pid=req.body.pid;
        let sql1=`SELECT pro.*,(SELECT user.nickname FROM pro_user left join user on pro_user.member=user.id WHERE pro_user.pro=pro.id AND job=0)creater,(SELECT count(*) FROM `+'`order`'+` WHERE order.project=pro.id)orderNum,(SELECT count(*) FROM pro_user WHERE pro_user.pro=pro.id AND pro_user.state=1)memberNum FROM pro WHERE id=${pid}`;
        let res1=await myPro(sql1);
        if(res1===0){sendError.error(req,res,'修改失败');return}
        res.body=res1[0];
        next();

    },
    async delete(req,res,next){
        let pid=req.body.pid;
        let sql1=`DELETE FROM pro WHERE id=${pid}`;
        let res1=await myPro(sql1);
        if(res1===0){sendError.error(req,res,'删除失败');return}
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
