var express = require('express');
var router = express.Router();
var User = require('../db/userSql');
var QcloudSms = require("qcloudsms_js");
var connection = require('../db/server');
var jwt = require('jsonwebtoken');
var alipaySdk = require('../db/alipay');
// 引入axios
const axios = require("axios");
const AlipayFormData = require('alipay-sdk/lib/form').default;

function getTokenTime(exp) {
    let getTime = parseInt(new Date().getTime() / 1000);

    if (getTime - exp > 60) {
        return true;
    }
}
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
//推荐页
router.get('/api/index_list/0/data/1', function (req, res, next) {
    res.send({
        code: 0,
        topBar: [
            {
                id: 0,
                title: '推荐',

            },
            {
                id: 1,
                title: '大红袍',
            },
            {
                id: 2,
                title: '绿茶',
            },
            {
                id: 3,
                title: '铁观音',
            },
            {
                id: 4,
                title: '红茶',
            },
            {
                id: 5,
                title: '普尔',
            },
            {
                id: 6,
                title: '茶具',
            },
            {
                id: 7,
                title: '花茶',
            },
        ],
        newdata: [
            {
                id: 0,
                type: 'swiperList',
                data: [
                    {
                        id: 1,
                        imgUrl: './images/swiper1.jpeg'
                    },
                    {
                        id: 2,
                        imgUrl: './images/swiper2.jpeg'
                    },
                    {
                        id: 3,
                        imgUrl: './images/swiper3.jpeg'
                    },
                ]
            },
            {
                id: 1,
                type: 'iconList',
                data: [
                    {
                        id: 1,
                        title: '自饮茶',
                        imgUrl: './images/icons1.png'
                    },
                    {
                        id: 2,
                        title: '茶具',
                        imgUrl: './images/icons2.png'
                    },
                    {
                        id: 3,
                        title: '茶礼盒',
                        imgUrl: './images/icons3.png'
                    },
                    {
                        id: 4,
                        title: '领福利',
                        imgUrl: './images/icons4.png'
                    },
                    {
                        id: 5,
                        title: '官方验证',
                        imgUrl: './images/icons5.png'
                    },
                ]
            },
            {
                id: 2,
                type: 'recommendList',
                data: [
                    {
                        id: 1,
                        name: '龙井1號铁罐250g',
                        content: '鲜爽甘醇 口粮首选',
                        price: '68',
                        imgUrl: './images/recommend.jpeg'
                    },
                    {
                        id: 2,
                        name: '龙井1號铁罐250g',
                        content: '鲜爽甘醇 口粮首选',
                        price: '68',
                        imgUrl: './images/recommend.jpeg'
                    }
                ]
            },
            {
                id: 4,
                type: 'likeList',
                data: [
                    {
                        id: 1,
                        imgUrl: './images/like.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 2,
                        imgUrl: './images/recommend.jpeg',
                        name: '龙井1號铁罐250g',
                        price: '68'
                    },
                    {
                        id: 3,
                        imgUrl: './images/like.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 4,
                        imgUrl: './images/goods3.jpg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 5,
                        imgUrl: './images/goods4.jpg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 6,
                        imgUrl: './images/like.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 7,
                        imgUrl: './images/like2.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 8,
                        imgUrl: './images/like3.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 9,
                        imgUrl: './images/like2.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 10,
                        imgUrl: './images/like3.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 11,
                        imgUrl: './images/like3.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 12,
                        imgUrl: './images/like2.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 13,
                        imgUrl: './images/like2.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 14,
                        imgUrl: './images/like3.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 15,
                        imgUrl: './images/like2.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 16,
                        imgUrl: './images/like3.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                ]
            }
        ]
    })
});
//大红袍
router.get('/api/index_list/1/data/1', function (req, res, next) {
    res.send({
        code: 0,
        newdata: [
            {
                id: 3,
                type: 'AdList',
                data: [
                    {
                        id: 1,
                        imgUrl: './images/dhp.jpeg',
                    },
                ]
            },
            {
                id: 4,
                type: 'likeList',
                data: [
                    {
                        id: 1,
                        imgUrl: './images/like.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 2,
                        imgUrl: './images/like.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 3,
                        imgUrl: './images/like.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                ]
            }
        ]








    })
});
//绿茶
router.get('/api/index_list/2/data/1', function (req, res, next) {
    res.send({
        code: 0,
        newdata: [
            {
                id: 3,
                type: 'AdList',
                data: [
                    {
                        id: 1,
                        imgUrl: './images/dhp.jpeg',
                    },
                ]
            },
            {
                id: 4,
                type: 'likeList',
                data: [
                    {
                        id: 1,
                        imgUrl: './images/like.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 2,
                        imgUrl: './images/like.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                    {
                        id: 3,
                        imgUrl: './images/like.jpeg',
                        name: '建盏茶具套装红色芝麻12件套',
                        price: '299'
                    },
                ]
            }
        ]








    })
});
//搜索列表
router.get('/api/goods/shopList', function (req, res, next) {
    let [searchName, orderName] = Object.keys(req.query);
    let [name, order] = Object.values(req.query)
    console.log(name, order);
    connection.query('select * from goods_list where name like "%' + name + '%" order by ' + orderName + ' ' + order + '', function (err, result) {
        res.send({
            code: 0,
            data: result,
        })
    })
});
//分类页
router.get('/api/goods/list', function (req, res, next) {
    res.send({
        code: 0,
        data: [
            {
                //一级
                id: 0,
                name: '推荐',
                data: {
                    id: 0,
                    name: '推荐',
                    list: [
                        {
                            id: 0,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 1,
                            name: '功夫茶具',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 2,
                            name: '茶具电器',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 3,
                            name: '紫砂壶',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 4,
                            name: '龙井',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 5,
                            name: '武夷岩茶',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 6,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 7,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                    ]
                }
            },
            {
                //一级
                id: 1,
                name: '绿茶',
                data: {
                    id: 0,
                    name: '绿茶',
                    list: [
                        {
                            id: 0,
                            name: '龙井',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 1,
                            name: '碧螺春',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 2,
                            name: '雀舌',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 3,
                            name: '安吉白茶',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 4,
                            name: '六安瓜片',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 5,
                            name: '武夷岩茶',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 6,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 7,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                    ]
                }
            },
            {
                //一级
                id: 2,
                name: '乌龙',
                data:
                {
                    id: 0,
                    name: '乌龙',
                    list: [
                        {
                            id: 0,
                            name: '龙井',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 1,
                            name: '碧螺春',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 2,
                            name: '雀舌',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 3,
                            name: '安吉白茶',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 4,
                            name: '六安瓜片',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 5,
                            name: '武夷岩茶',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 6,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 7,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                    ]
                }
            },
            {
                //一级
                id: 3,
                name: '红茶',
                data: {
                    id: 0,
                    name: '红茶',
                    list: [
                        {
                            id: 0,
                            name: '龙井',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 1,
                            name: '碧螺春',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 2,
                            name: '雀舌',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 3,
                            name: '安吉白茶',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 4,
                            name: '六安瓜片',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 5,
                            name: '武夷岩茶',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 6,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 7,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                    ]
                }
            },
            {
                //一级
                id: 4,
                name: '白茶',
                data: {
                    id: 0,
                    name: '白茶',
                    list: [
                        {
                            id: 0,
                            name: '龙井',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 1,
                            name: '碧螺春',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 2,
                            name: '雀舌',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 3,
                            name: '安吉白茶',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 4,
                            name: '六安瓜片',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 5,
                            name: '武夷岩茶',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 6,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 7,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                    ]
                }
            },
            {
                //一级
                id: 5,
                name: '普尔',
                data: {
                    id: 0,
                    name: '普尔',
                    list: [
                        {
                            id: 0,
                            name: '龙井',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 1,
                            name: '碧螺春',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 2,
                            name: '雀舌',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 3,
                            name: '安吉白茶',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 4,
                            name: '六安瓜片',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 5,
                            name: '武夷岩茶',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 6,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                        {
                            id: 7,
                            name: '铁观音',
                            imgUrl: '/images/list1.jpeg'
                        },
                    ]
                }
            },
        ],
    })
});
//查寻商品id接口
router.get('/api/goods/id', function (req, res, next) {
    let id = req.query.id;
    connection.query('select * from goods_list where id="' + id + '" ', function (err, results) {
        res.json({
            code: 0,
            data: results,
        });
    })


});
//登录接口
router.post('/api/login', function (req, res, next) {
    //接收前端传递过来的值
    let user = {
        userTel: req.body.userTel,
        userPwd: req.body.userPwd,
    }
    let tel = user.userTel;
    let pwd = user.userPwd || '666666';
    var jwt = require('jsonwebtoken');
    //用户信息
    let payload = { tel, };
    //口令
    let secret = 'dzd';
    //生成Token(token不能重复)
    let token = jwt.sign(payload, secret, {
        expiresIn: 60,
    })
    //查询用户手机号是否存在
    connection.query(User.queryTel(user), function (error, results) {
        //手机号存在 
        if (results.length > 0) {
            //记录id
            let id = results[0].id;
            connection.query(User.queryPwd(user), function (err, result) {
                if (result.length > 0) {
                    //替换token
                    connection.query(`update userinfo set token='${token}' where id=${id}`, function (e, r) {
                        res.send({
                            code: 200,
                            data: {
                                success: true,
                                msg: '登录成功',
                                data: result[0]
                            }
                        })
                    })
                    //手机号和密码都对
                } else {
                    //密码不对
                    res.send({
                        code: 302,
                        data: {
                            success: false,
                            msg: '密码不正确'
                        }
                    })
                }
            })

        } else {
            //不存在
            res.send({
                code: 301,
                data: {
                    success: false,
                    msg: '手机号不存在'
                }
            })
        }
    })
});
//获取验证码
router.post('/api/code', function (req, res, next) {
    let tel = req.body.phone;

    // 短信应用SDK AppID
    var appid = 1400187558;  // SDK AppID是1400开头

    // 短信应用SDK AppKey
    var appkey = "dc9dc3391896235ddc2325685047edc7";

    // 需要发送短信的手机号码
    var phoneNumbers = [tel];

    // 短信模板ID，需要在短信应用中申请
    var templateId = 285590;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

    // 签名
    var smsSign = "三人行慕课";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

    // 实例化QcloudSms
    var qcloudsms = QcloudSms(appid, appkey);

    // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
    function callback(err, ress, resData) {
        if (err) {
            console.log("err: ", err);
        } else {
            res.send({
                code: 200,
                data: {
                    success: true,
                    data: ress.req.body.params[0]
                }
            })
        }
    }

    var ssender = qcloudsms.SmsSingleSender();
    //这个变量：params 就是往手机上，发送的短信
    var params = [Math.floor(Math.random() * (9999 - 1000)) + 1000];
    ssender.sendWithParam(86, phoneNumbers[0], templateId,
        params, smsSign, "", "", callback);  // 签名参数不能为空串
});
//手机验证码自动注册
router.post('/api/addUser', function (req, res, next) {
    let tel = {
        userTel: req.body.phone,
    }
    //查询用户是否存在
    connection.query(User.queryTel(tel), function (err, results) {
        if (err) throw err
        if (results.length > 0) {
            res.send({
                code: 200,
                data: {
                    success: 'true',
                    msg: '登录成功',
                    data: results[0],
                }
            })
        } else {
            connection.query(User.insertUser(tel), function (err, results) {
                if (err) throw err;
                connection.query(User.queryTel(tel), function (error, r) {
                    if (err) throw err;
                    res.send({
                        code: 200,
                        success: 'true',
                        msg: '登录成功',
                        data: r[0]
                    })
                })
            })
        }
    })
})
//手动注册
router.post('/api/register', function (req, res, next) {
    let user = {
        userTel: req.body.userTel,
        userPwd: req.body.userPwd,
    }
    //查询用户是否存在
    connection.query(User.queryTel(user), function (err, results) {
        if (err) throw err
        if (results.length > 0) {
            res.send({
                code: 200,
                data: {
                    success: 'false',
                    msg: '手机号已存在',
                }
            })
        } else {
            connection.query(User.insertUser(user), function (err, r) {
                if (err) throw err;
                res.send({
                    code: 200,
                    success: 'true',
                    msg: '注册成功',
                    data: r[0]
                })
            })
        }
    })
})
//选择用户
router.post('/api/selectUser', function (req, res, next) {
    let user = {
        userTel: req.body.phone,
    }
    //查询用户是否存在
    connection.query(User.queryTel(user), function (err, results) {
        if (err) throw err
        if (results.length > 0) {
            res.send({
                code: 200,
                data: {
                    success: 'true',
                    msg: '验证成功',
                    data: results[0],
                }
            })
        } else {
            res.send({
                code: 302,
                success: 'false',
                msg: '手机号未注册',
            })
        }
    })
})
//修改密码
router.post('/api/recover', function (req, res, next) {
    let user = {
        userTel: req.body.userTel,
        userPwd: req.body.userPwd,
    }
    //查询用户是否存在
    connection.query(User.queryTel(user), function (err, results) {
        if (err) throw err
        //数据库里的id
        let id = results[0].id;
        let pwd = results[0].userPwd
        connection.query(`update userinfo set userPwd=replace(userPwd,${pwd},${user.userPwd}) where id=${id}`, function (err, r) {
            res.send({
                code: 200,
                data: {
                    success: 'true',
                    msg: '修改成功',
                }
            })
        })
    })
})
//添加购物车
router.post('/api/addCart', function (req, res, next) {
    let token = req.headers.token;
    let goodsId = req.body.goodsId;
    if (!token) {
        res.send({
            code: 404,
            msg: '未登录',
            success: false,
        })
        return;
    }
    let tel = jwt.decode(token);
    console.log(tel);
    if (getTokenTime(tel.exp)){
        console.log('11111');
        res.send({
            code: 1000,
            success: false,
        })
        return;
    }
    connection.query(`select * from userinfo where userTel=${tel.tel}`, function (err, results) {
        console.log(results[0]);
        //查询用户
        let uid = results[0].id;
        //查询商品
        connection.query(`select * from goods_list where id=${goodsId}`, function (err, result) {
            console.log(result[0]);
            let goodsName = result[0].name;
            let goodsId = result[0].id;
            let goodsPrice = result[0].price;
            let goodsImgUrl = result[0].imgUrl;
            //查询当前用户的购物车中是否有相同的商品
            connection.query(`select * from goods_cart where uid=${uid} and goods_id=${goodsId}`, function (e, r) {
                console.log(r.length);
                if (r.length > 0) {
                    let oldNum = parseInt(r[0].goods_num);
                    let newNum = oldNum + 1;
                    let id = r[0].id;
                    console.log(2);
                    connection.query(`update goods_cart set goods_num=replace(goods_num,${oldNum},${newNum}) where id=${id}`, function (e, r2) {
                        res.send({
                            code: 200,
                            success: true,
                            msg: '已加入购物车',

                        })
                    })
                } else {
                    connection.query(`insert into goods_cart (uid,goods_id,goods_name,goods_price,goods_num,imgUrl) values ("${uid}","${goodsId}","${goodsName}","${goodsPrice}","1","${goodsImgUrl}")`, function (e, r2) {
                        res.send({
                            code: 200,
                            success: 'true',
                            msg: '已加入购物车'

                        })
                    })
                }
            })

        })

    })
})
//查询用户购物车列表
router.post('/api/selectCart', function (req, res, next) {
    let token = req.headers.token;
    if (!token) {
        res.send({
            code: 404,
            msg: '未登录',
            success: false,
        })
        return;
    }
    let tel = jwt.decode(token);
    let goodsId = req.body.goodsId;
    console.log(tel);
    connection.query(`select * from userinfo where userTel=${tel.tel}`, function (err, results) {
        console.log(results[0]);
        //查询用户
        let uid = results[0].id;
        //查询购物车
        connection.query(`select * from goods_cart where uid=${uid}`, function (e, result) {
            res.send({
                success: true,
                code: 200,
                data: result,
            })
        })

    })
})
//删除购物车
router.post('/api/deleteCart', function (req, res, next) {
    let id = req.body.id;
    for (let i = 0; i < id.length; i++) {
        connection.query(`delete from goods_cart where id=${id[i]}`, function (err, results) {
            if (err) throw err
        })
    }
    res.send({
        code: 200,
        success: true,
        msg: '删除成功',
    })


})
//更新购物车商品的数量
router.post('/api/updateNum', function (req, res, next) {
    let token = req.headers.token;
    if (!token) {
        res.send({
            code: 404,
            msg: '未登录',
            success: false,
        })
        return;
    }
    let newNum = req.body.num;
    let id = req.body.id;
    connection.query(`select * from goods_cart where id=${id}`, function (err, results) {
        let oldNum = results[0].goods_num;
        connection.query(`update goods_cart set goods_num=replace(goods_num,${oldNum},${newNum}) where id=${id}`, function (e, r) {
            res.send({
                code: 200,
                success: true,
                msg: '操作成功',

            })
        })
    })
})
//添加收货地址
router.post('/api/addAddress', function (req, res, next) {
    let token = req.headers.token;
    if (!token) {
        res.send({
            code: 404,
            msg: '未登录',
            success: false,
        })
        return;
    }
    let user = jwt.decode(token);
    console.log(user);
    //拿到前端传递的数据
    let { name, tel, province, city, county, addressDetail, isDefault, areaCode } = req.body;
    //查询当前用户
    connection.query(`select * from userinfo where userTel=${user.tel}`, function (err, results) {
        let uid = results[0].id;
        //如果默认状态是0就正常添加信息
        //
        if (isDefault != 1) {
            connection.query(`insert into user_address (uid,name, tel, province, city, county, addressDetail, isDefault,areaCode) values ("${uid}","${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}") `, function (e, r) {
                res.send({
                    code: 200,
                    msg: '添加成功',
                    success: true,
                })
            })
        } else {
            connection.query(`select * from user_address where uid=${uid} and isDefault=${isDefault}`, function (e, r) {
                console.log(r);
                if (r.length > 0) {
                    let addressID = r[0].id;
                    connection.query(`update user_address set isDefault=replace(isDefault,'1','0') where id=${addressID}`, function (e, r1) {
                        connection.query(`insert into user_address (uid,name, tel, province, city, county, addressDetail, isDefault,areaCode) values ("${uid}","${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}") `, function (e, r) {
                            res.send({
                                code: 200,
                                msg: '添加成功',
                                success: true,
                            })
                        })
                    })

                } else {
                    connection.query(`insert into user_address (uid,name, tel, province, city, county, addressDetail, isDefault,areaCode) values ("${uid}","${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}") `, function (e, r) {
                        res.send({
                            code: 200,
                            msg: '添加成功',
                            success: true,
                        })
                    })
                }

            })
        }
    })

})
//获取收货地址列表
router.post('/api/getAddress', function (req, res, next) {
    let token = req.headers.token;
    if (!token) {
        res.send({
            code: 404,
            msg: '未登录',
            success: false,
        })
        return;
    }
    let user = jwt.decode(token);
    console.log(user);
    //拿到前端传递的数据
    //查询当前用户
    connection.query(`select * from userinfo where userTel=${user.tel}`, function (err, results) {
        let uid = results[0].id;
        connection.query(`select * from user_address where uid=${uid}`, function (err, results) {
            res.send({
                code: 200,
                success: true,
                msg: '获取成功',
                data: results,
            })
        })
    })
    /*   res.send({
          code: 200,
          success: true,
          msg: '获取成功',
      }) */

})
//更新收货地址
router.post('/api/updateAddress', function (req, res, next) {
    let token = req.headers.token;
    if (!token) {
        res.send({
            code: 404,
            msg: '未登录',
            success: false,
        })
        return;
    }
    let user = jwt.decode(token);
    console.log(user);
    //拿到前端传递的数据
    let { name, tel, province, city, county, addressDetail, isDefault, areaCode, id } = req.body;
    //查询当要修改的收货信息
    connection.query(`select * from userinfo where userTel=${user.tel}`, function (err, results) {
        let uid = results[0].id;
        connection.query(`select * from user_address where uid=${uid} and isDefault=${isDefault}`, function (e, r) {
            console.log(r);
            //把所有的收获地址改为0
            if (r.length > 0) {
                let addressID = r[0].id;
                connection.query(`update user_address set isDefault=replace(isDefault,'1','0') where id=${addressID}`, function (e, r2) {
                    let updateSql = `update user_address set uid=?,name=?, tel=?, province=?, city=?, county=?, addressDetail=?, isDefault=?, areaCode=? where  id=${id}`;
                    connection.query(updateSql, [uid, name, tel, province, city, county, addressDetail, isDefault, areaCode], function (errors, data) {
                        res.send({
                            code: 200,
                            msg: '修改成功',
                            success: true,
                        })
                    })
                })
            } else {
                let updateSql = `update user_address set uid=?,name=?, tel=?, province=?, city=?, county=?, addressDetail=?, isDefault=?, areaCode=? where  id=${id}`;
                connection.query(updateSql, [uid, name, tel, province, city, county, addressDetail, isDefault, areaCode], function (errors, data) {
                    res.send({
                        code: 200,
                        msg: '修改成功',
                        success: true,
                    })
                })
            }

        })
    })

})
//删除收货地址
router.post('/api/deleteAddress', function (req, res, next) {
    let token = req.headers.token;
    if (!token) {
        res.send({
            code: 404,
            msg: '未登录',
            success: false,
        })
        return;
    }
    let user = jwt.decode(token);
    console.log(user);
    //拿到前端传递的数据
    let { name, tel, province, city, county, addressDetail, isDefault, areaCode, id } = req.body;
    //查询当要修改的收货信息
    connection.query(`select * from userinfo where userTel=${user.tel}`, function (err, results) {
        let uid = results[0].id;
        connection.query(`delete  from user_address where uid=${uid} and id=${id}`, function (err, results) {
            res.send({
                code: 200,
                msg: '删除成功',
            })
        })
    })

})
//生成订单
router.post('/api/addOrder', function (req, res, next) {
    let token = req.headers.token;
    if (!token) {
        res.send({
            code: 404,
            msg: '未登录',
            success: false,
        })
        return;
    }
    let user = jwt.decode(token);
    console.log(user);
    //拿到前端传递的数据
    let orderlist = req.body.orderlist;
    //生成订单号order_id规则:时间戳+六位随机数
    function setTimeDate(s) {
        return s < 10 ? '0' + s : s;
    }
    function randomNumber() {
        const now = new Date();
        let month = now.getMonth() + 1;
        let day = now.getDay();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        month = setTimeDate(month);
        day = setTimeDate(day);
        hours = setTimeDate(hours);
        minutes = setTimeDate(minutes);
        seconds = setTimeDate(seconds);
        let orderCode = now.getFullYear().toString() + month.toString() + hours.toString() + minutes.toString() + seconds.toString() + Math.round(Math.random() * 1000000).toString();
        return orderCode;
    }
    /* 未支付:1,
       待支付:2,
       支付成功:3,
       支付失败:4 ||0
     */
    let order_id = randomNumber();
    //商品列表名称
    let goods_name = [];
    //订单商品总金额
    let goods_price = 0;
    //订单商品总数量
    let goods_num = 0;
    orderlist.forEach((item) => {
        goods_name.push(item.goods_name);
        goods_price += item.goods_price * item.goods_num;
        goods_num += parseInt(item.goods_num);
    })
    console.log(goods_name, goods_price, goods_num);
    connection.query(`select * from userinfo where userTel=${user.tel}`, function (err, results) {
        let uid = results[0].id;
        connection.query(`insert into store_order (uid,order_id,goods_name,goods_num,goods_price,order_status) values ("${uid}","${order_id}","${goods_name}","${goods_num}","${goods_price}","1")`, function (e, result) {
            connection.query(`select * from store_order where uid=${uid} and order_id=${order_id}`, function (err, r) {
                res.send({
                    code: 200,
                    msg: '订单号已生成',
                    success: true,
                    data: r,
                })
            })
        });
    })


})
//查询本地存储的订单
router.post('/api/selectOrder', function (req, res, next) {
    let order_id = req.body.order_id;
    let token = req.headers.token;
    if (!token) {
        res.send({
            code: 404,
            msg: '未登录',
            success: false,
        })
        return;
    }
    let user = jwt.decode(token);
    //查询指定用户
    connection.query(`select * from userinfo where userTel=${user.tel}`, function (err, results) {
        let uid = results[0].id;
        connection.query(`select * from store_order where uid=${uid} and order_id=${order_id}`, function (e, r) {
            res.send({
                code: 200,
                success: true,
                msg: '获取成功',
                data: r
            })
        })
    })




})
//修改订单状态
router.post('/api/submitOrder', function (req, res, next) {
    //获取前端变量
    let order_id = req.body.order_id;//订单号
    let selectlist = req.body.selectlist;//商品id
    let token = req.headers.token;
    if (!token) {
        res.send({
            code: 404,
            msg: '未登录',
            success: false,
        })
        return;
    }
    let user = jwt.decode(token);
    //查询指定用户
    connection.query(`select * from userinfo where userTel=${user.tel}`, function (err, results) {
        let uid = results[0].id;
        //查询对应订单修改状态
        connection.query(`select * from store_order where uid=${uid} and order_id=${order_id}`, function (e, result) {
            //订单在数据库的id
            let id = result[0].id;
            let order_status = result[0].order_status;
            //改变订单状态
            connection.query(`update store_order set order_status=replace(order_status,'${order_status}','2') where id=${id}`, function (er, r) {
                //购物车的数据删除
                selectlist.forEach(item => {
                    connection.query(`delete from goods_cart where id=${item}`, function (e, data) {

                    })
                })
                res.send({
                    code: 200,
                    msg: '提交成功',
                    success: true,
                })
            })
        })

    })




})
//发起支付
router.post('/api/payment', function (req, res, next) {
    //获取前端变量
    let token = req.headers.token;
    if (!token) {
        res.send({
            code: 404,
            msg: '未登录',
            success: false,
        })
        return;
    }
    let user = jwt.decode(token);
    //查询指定用户
    let order_id = req.body.order_id;
    let name = req.body.name;
    let price = req.body.price;

    // 开始对接支付宝API
    const formData = new AlipayFormData();
    //调用setMethod 并传入get,会返回可以跳转到支付页面的url,
    formData.setMethod("get");
    // 支付时信息
    const bizContent = {
        out_trade_no: order_id, //订单号
        product_code: "FAST_INSTANT_TRADE_PAY",
        total_amount: price, //总价格
        subject: name, //商品名称
    };
    formData.addField("bizContent", bizContent);
    //支付成功或者失败跳转的链接
    formData.addField("returnUrl", "http://localhost:8080/payment");

    // 返回promise
    const result = alipaySdk.exec(
        // "alipay.trade.page.pay",
        "alipay.trade.wap.pay",
        {},
        { formData: formData }
    ).catch(error => console.error('caught error!', error));
    ////对接支付宝成功，支付宝返回的数据
    result.then(resp => {
        res.send({
            code: 200,
            success: true,
            msg: "支付中",
            paymentUrl: resp,
        })
    })

})
//成功或者失败
router.post('/api/successPayment', function (req, res, next) {
    //获取前端变量
    let out_trade_no = req.body.out_trade_no;
    let trade_no = req.body.trade_no;
    let token = req.headers.token;
    if (!token) {
        res.send({
            code: 404,
            msg: '未登录',
            success: false,
        })
        return;
    }
    let user = jwt.decode(token);
    // 支付宝配置
    const formData = new AlipayFormData();
    //调用setMethod 并传入get,会返回可以跳转到支付页面的url,
    formData.setMethod("get");
    // 支付时信息
    const bizContent = {
        out_trade_no,
        trade_no
    };
    formData.addField("bizContent", bizContent);
    // 返回promise
    const result = alipaySdk.exec(
        "alipay.trade.query",
        {},
        { formData: formData }
    ).catch(error => console.error('caught error!', error));
    //对接支付宝API
    result.then(resData => {
        axios({
            method: 'GET',
            url: resData,
        }).then(resdata => {
            console.log(resdata);
            let respondeCode = resdata.alipay_trade_query_response;
            if (respondeCode.code == 10000) {
                console.log(respondeCode.trade_status);
                switch (respondeCode.trade_status) {
                    case 'WAIT_BUYER_PAY':
                        res.send({
                            code: 10001,
                            message: "支付宝有交易记录，没付款"
                        })
                        break;
                    case 'TRADE_FINISHED':
                        // 完成交易的逻辑
                        res.send({
                            code: 10002,
                            message: "交易完成(交易结束，不可退款)"
                        })
                        break;
                    case 'TRADE_SUCCESS':
                        connection.query(`select * from userinfo where userTel=${user.tel}`, function (err, results) {
                            let uid = results[0].id;
                            connection.query(`select *from store_order where uid=${uid} and order_id=${out_trade_no}`, function (er, result) {
                                console.log(result);
                                let id = result[0].id
                                connection.query(`update store_order set order_status=replace(order_status,'2','3') where id=${id}`, function (e, r) {
                                    // 完成交易的逻辑
                                    res.send({
                                        code: 10002,
                                        message: "交易完成"
                                    })
                                })
                            })
                        })

                        break;
                    case 'TRADE_CLOSED':
                        // 交易关闭的逻辑
                        res.send({
                            code: 10003,
                            message: "交易关闭"
                        })
                        break;
                }
            } else if (respondeCode.code == 40004) {
                res.send({
                    code: 40004,
                    message: "交易不存在"
                })
            }
        }).catch(err => {
            res.send({
                code: 50000,
                msg: "交易失败",
                data: err
            })
        })

    })
})
module.exports = router;
