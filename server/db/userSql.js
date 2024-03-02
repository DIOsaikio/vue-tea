

const User = {
    queryTel(option) {
        return 'select * from userinfo where userTel=' + option.userTel + '';
    },
    queryPwd(option) {
        return 'select * from userinfo where (userTel=' + option.userTel + ') and userPwd=' + option.userPwd + '';
    },
    insertUser(option) {
        let tel = option.userTel;
        let pwd = option.userPwd || '666666';
        var jwt = require('jsonwebtoken');
        //用户信息
        let payload = { tel,};
        //口令
        let secret = 'dzd';
        //生成Token(token不能重复)
        let token=jwt.sign(payload,secret,{
            expiresIn:60,
        })
        return 'insert into userinfo(userTel,userPwd,nickName,imgUrl,token) values ("' + tel + '","' + pwd + '","","1.jpg","'+token+'")';
    }
}
module.exports = User