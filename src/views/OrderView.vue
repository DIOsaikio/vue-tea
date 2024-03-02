<template>
    <div class='order container'>
        <header>
            <i class='iconfont icon-fanhui' @click='$router.back()'></i>
            <span>提交订单</span>
            <i class='iconfont icon-kefu'></i>
        </header>
        <section>
            <div class='path'>
                <h3 class='path-title'>收货信息</h3>
                <div class='path-content' @click="goAddress">
                    <div>
                        <span>{{ address.name }}</span>
                        <span>{{ address.tel }}</span>
                    </div>
                    <div>
                        <span>{{ address.province }}</span>
                        <span>{{ address.city }}</span>
                        <span>{{ address.county }}</span>
                        <span>{{ address.addressDetail }}</span>
                    </div>
                </div>
            </div>
            <div class='payment'>
                <div class='payment-title'>支付方式：</div>
                <van-radio-group v-model="radioPayment">
                    <van-radio name="wx">微信支付</van-radio>
                    <van-radio name="ali">支付宝支付</van-radio>
                </van-radio-group>
            </div>
            <div class='goods'>
                <ul>
                    <li v-for='(item, index) in goodsList' :key='index'>
                        <div>
                            <img :src="item.imgUrl" alt="">
                        </div>
                        <div class='goods-content'>
                            <h4>{{ item.goods_name }}</h4>
                            <div class='goods-total'>
                                <span>¥{{ item.goods_price }}</span>
                                <span>x{{ item.goods_num }}</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <footer>
            <div class='order-total'>
                <span>共</span>
                <b>{{ total.num }}</b>
                <span>件,</span>
                <span>总金额：</span>
                <em>¥{{ total.price }}</em>
            </div>
            <div class='order-topay' @click="gopayment">
                提交订单
            </div>
        </footer>
    </div>
</template>
<script>
import request from '@/components/common/api/request'
import { mapState, mapGetters, mapMutations } from 'vuex'
import { Toast } from 'vant'
import bus from '@/bus'
import qs from 'qs'
export default {
    data() {
        return {
            radioPayment: 'wx',
            address: {},
            item: [],
            total: {
                price: '',
                num: '',
            },
            goodsList: [],
        }
    },
    computed: {
        ...mapState({
            addresslist: state => state.address.addressList,
            order_id: state => state.order.order_id,
            selectlist: state => state.cart.selectlist,
        }),
        ...mapGetters(['defaultAddress']),

    },
    created() {
        this.item = JSON.parse(this.$route.query.detail);
        this.goodsList = JSON.parse(this.$route.query.goodslist);
        //获取收货地址
        this.getAddress();
        //根据订单号查询订单
        this.getOrder();
    },
    activated() {
        this.item = JSON.parse(this.$route.query.detail);
        this.goodsList = JSON.parse(this.$route.query.goodslist);
        bus.$on('selectAddress', function (data) {
            this.address = JSON.parse(data)
            console.log(this.address, 'xxxx');
        }.bind(this));
        this.getOrder();
    },
    methods: {
        ...mapMutations(['INIT_ADDRESS']),
        getAddress() {
            request.$axios(
                {
                    url: '/api/getAddress',
                    method: 'POST',
                    headers: {
                        token: true,
                    },
                }
            ).then(res => {
                console.log(res.data.data);
                this.INIT_ADDRESS(res.data.data);
                if (this.defaultAddress.length > 0) {
                    this.address = this.defaultAddress[0];
                } else {
                    this.address = this.addresslist[0];
                }
            });
        },
        getOrder() {
            request.$axios(
                {
                    url: '/api/selectOrder',
                    method: 'POST',
                    data: {
                        order_id: this.order_id,
                    },
                    headers: {
                        token: true
                    },
                }
            ).then(res => {
                console.log(res.data.data);
                this.total.price = res.data.data[0].goods_price;
                this.total.num = res.data.data[0].goods_num;
            })

        },
        goAddress() {
            this.$router.push({
                path: '/address',
                query: {
                    type: 'select',
                }
            });
        },
        gopayment() {
            //是否有地址
            if (this.address) {
                //发送请求 1 修改订单状态 2删除购物车中订单商品的数据
                request.$axios(
                    {
                        url: '/api/submitOrder',
                        method: 'POST',
                        data: {
                            order_id: this.order_id,
                            selectlist: this.selectlist,
                        },
                        headers: {
                            token: true,
                            /*  'content-type':'application/x-form-urlencoded', */
                        },
                    }
                ).then(res => {
                    let newArr = [];
                    this.goodsList.forEach(v => {
                        newArr.push(v.goods_name);
                    })
                    let dataOrder = {
                        order_id: this.order_id,
                        price: this.total.price,
                        name: newArr.join('')
                    }
                    if (res.data.success) {
                        //去支付
                        request.$axios(
                            {
                                url: '/api/payment',
                                method: 'POST',
                                data:qs.stringify(dataOrder), //用qs将参数序列化增加安全性
                                headers: {
                                    token: true,
                                    'Content-Type': 'application/x-www-form-urlencoded',//支付的头信息格式
                                },
                            }
                        ).then(res=>{
                            //res返回的是url 前端打开url
                            console.log(res);
                            if(res.data.success){
                                //打开支付宝页面
                                window.location.href=res.data.paymentUrl;
                            }
                        })
                    }
                    console.log(res);
                })
            } else {
                Toast('请选择地址');
                return;
            }
        }
    }
}
</script>

<style lang='scss' scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.173333rem;
    color: #fff;
    background-color: #b0352f;

    i {
        padding: 0 0.4rem;
        font-size: 0.586666rem;
    }

    span {
        font-weight: 300;
        font-size: 0.48rem;
    }
}

section {
    background-color: #f7f7f7;

    .path-title {
        padding: 0.4rem;
        font-size: 0.48rem;
    }

    .path-content {
        padding: 0.16rem 0.4rem;
        font-size: 0.373333rem;
        background-color: #FFFFFF;

        span {
            padding-right: 0.16rem;
        }
    }

    .payment {
        padding: 0.16rem 0.4rem;
        margin-top: 0.4rem;
        font-size: 0.426666rem;
        background-color: #FFFFFF;

        .van-radio-group {
            display: flex;
            padding: 0.16rem 0;

            .van-radio {
                padding-right: 0.266666rem;
            }
        }
    }

    .goods {
        padding: 0.16rem 0.4rem;
        margin-top: 0.4rem;
        font-size: 0.426666rem;
        background-color: #FFFFFF;

        ul {
            width: 100%;

            li {
                display: flex;
                width: 100%;

                img {
                    width: 1.973333rem;
                    height: 1.973333rem;
                }

                .goods-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding-left: 0.4rem;

                    .goods-total {
                        display: flex;
                        justify-content: space-between;
                    }
                }
            }
        }

    }
}

footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 1.2rem;
    border-top: 1px solid #ccc;

    .order-total {
        font-size: 0.426666rem;

        span {
            padding: 0 0.16rem;
        }

        b {
            color: #b0352f;
        }

        em {
            font-size: 0.48rem;
            color: #b0352f;
        }
    }

    .order-topay {
        width: 3.2rem;
        line-height: 1.2rem;
        color: #fff;
        font-size: 0.426666rem;
        text-align: center;
        background-color: #b0352f;
    }

}
</style>
