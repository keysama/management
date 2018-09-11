function send(phone,verifyCode){
    const SMSClient = require('@alicloud/sms-sdk');
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
    const accessKeyId = 'LTAI1mPqLuyAyE8W';
    const secretAccessKey = 'mPTb1ZVMLuO181mJA5iKkMdF53y3mM';
//初始化sms_client
    let smsClient = new SMSClient({accessKeyId, secretAccessKey});
//发送短信
    smsClient.sendSMS({
        PhoneNumbers: phone,
        SignName: 'TeamKey独立游戏站',
        TemplateCode: 'SMS_123668084',
        TemplateParam: '{"code":'+verifyCode+'}'
    }).then(function (res) {
        let {Code}=res;
        if (Code === 'OK') {
            seccess();
        }
    }, function (err) {
        error(err);
    })
}
function seccess(){

}
function error(err){
console.log('手机验证码发送失败：'+err)
}
module.exports = send;
