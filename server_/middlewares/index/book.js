const sendError=require('../../function/sendError.js');
const db=require('../../mode/dblink.js');

module.exports={
	add(req,res,next){
		let name=req.body.name;
        let sql=`INSERT INTO book (holder,name) VALUES (${req.session.user.id},'${name}')`;
	    db(sql, function(error,results){
            if(error){
                console.log(error)
                sendError.error(req,res,'数据库错误');
            }else{
                next();
            }
        })
    },
    async get(req,res,next){
        let uid=req.session.user.id;
        let sql=`SELECT * from book WHERE holder=${uid}`;
        let book=[];
        let result=await myPro(sql);
        for(let i=0;i<result.length;i++){
            let result2=await myPro(`SELECT member,mark,state,user.username,user.nickname,user.departments,user.phone FROM book_user LEFT JOIN user on book_user.member=user.id WHERE book=${result[i].id}`);
            book.push({...result[i],member:result2})
        }
        res.book=book;
        next();
    },
    async memberAdd(req,res,next){
        let book=req.body.book;
        let member=req.body.member;
        let type='username';
        if(/^[0-9]{11}$/.test(member)){//检查输入的是电话还是昵称
            type='phone';
        }
        let sql=`SELECT id FROM user WHERE ${type}='${member}'`;
        let result=await myPro(sql);//查有没有目标用户
        if(!result[0]){sendError.error(req,res,'该用户不存在');return}
        let result2=await myPro(`SELECT * FROM book WHERE holder=${result[0].id}`);//查目标通讯录
        let you=false;
        for(let i=0;i<result2.length;i++){//目标通讯录有无用户
            let result3=await myPro(`SELECT book,state FROM book_user WHERE book=${result2[i].id} AND member=${req.session.user.id}`);
            if(result3[0]){you=result3[0].book}
        }
        if(you){
            let result4=await myPro(`UPDATE book_user SET state=1 WHERE book=${you} AND member=${req.session.user.id}`);//修改对方通过
            let result5=await myPro(`INSERT INTO book_user (book,member,state) VALUES (${book},${result[0].id},1)`);
        }else{
            let result6=await myPro(`INSERT INTO book_user (book,member,state) VALUES (${book},${result[0].id},0)`);
        }
        next();
    },
    userInfo(req,res,next){
        let username=req.body.username;
        let type='username';
        if(/^[0-9]{11}$/.test(username)){
            type='phone'
        }
        let sql=`SELECT id,nickname,username,phone,departments,type FROM user WHERE ${type}='${username}'`;
        db(sql, function(error,results){
            if(error){
                sendError.error(req,res,'查找错误');
            }else{
                if(results[0]){
                    res.info=results[0];
                    next(); 
                }else{
                    sendError.error(req,res,'没有该用户');
                }
            }
        })
    }
}

function myPro (sql){
    return new Promise(function(resolve, reject) {
           db(sql, function(error,results){
            if(error){
                reject(error)
            }else{
               resolve(results)
            }
        })
    });
}
