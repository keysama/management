const express=require('express');
const static=require('express-static');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const consolidate=require('consolidate');
const bodyParser=require('body-parser');

let server=express();

server.listen(8081)

// 跨域
server.use(function(req,res,next){
    res.setHeader("Access-Control-Allow-Origin",'http://localhost:8080');
    res.setHeader("Access-Control-Allow-Credentials",true);
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.setHeader("X-Powered-By",' 3.2.1')
  if (req.method == 'OPTIONS') {
    res.sendStatus(200); /*让options请求快速返回*/
  } else {
    next();
  }
})

//1.获取请求数据
//get自带
//server.use(multerObj.any());
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json())
//2.cookie、session
server.use(cookieParser());
(function (){
    var keys=[];
    for(var i=0;i<100000;i++){
        keys[i]='a_'+Math.random();
    }
    server.use(cookieSession({
        name: 'sess_id',
        keys: keys,
        maxAge: 30*24*60*60*1000  //20min
    }));
})();


server.use(require('./router/index.js'));

server.engine('html', consolidate.ejs);
server.set('views', 'dist');
server.set('view engine', 'html');

server.use(express.static('static'));
server.use(express.static('dist'));




