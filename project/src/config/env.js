let baseUrl = ''; //请求发送的域名
let routerMode = 'hash';


if (process.env.NODE_ENV == 'development') {
    baseUrl = 'http://localhost:8081/';

}else if(process.env.NODE_ENV == 'production'){
    baseUrl = 'http://111.230.249.243:8081/';
}

let daily_url=baseUrl+'upload/comment/';//日志图片的存放位置
let files_url=baseUrl+'upload/pro/';//订单附件的存放位置
let templet_url=baseUrl+'templet/';//模板的存放位置
export {
    daily_url,
    files_url,
    templet_url,
	baseUrl,
	routerMode,
}