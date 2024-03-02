<template>
    <div class='cart container'>
        <header>
            <i class='iconfont icon-fanhui' @click="goback"></i>
            <span>购物车</span>
            <span @click="isNavBar" v-text="isNav ? '完成' : '编辑'"></span>
        </header>
        <section v-if="cartlist.length > 0">
            <div class='cart-title'>
                <van-checkbox :value="isCheckAll" @click="checkallFn"></van-checkbox>
                <span>商品</span>
            </div>
            <ul>
                <li v-for="(item, index) in cartlist" :key="index">
                    <div class='check'>
                        <van-checkbox @click="CHECK_ITEM(index)" v-model="item.checked"></van-checkbox>
                    </div>
                    <h2>
                        <img :src="item.imgUrl" alt="">
                    </h2>
                    <div class='goods'>
                        <div class='goods-title'>
                            <span>{{ item.goods_name }} </span>
                            <i class='iconfont icon-lajitong' @click="delGoodsFn(item.id)"></i>
                        </div>
                        <div class='goods-price'>¥{{ item.goods_price }}</div>
                        <van-stepper @change="changeNum($event, item)" v-model="item.goods_num" integer />
                    </div>
                </li>
            </ul>
        </section>
        <section v-else>
            暂无数据
        </section>
        <footer v-if="cartlist.length > 0">
            <div class='radio'>
                <van-checkbox :value="isCheckAll" @click="checkallFn"></van-checkbox>
            </div>
            <div class='total' v-show="!isNav">
                <div>
                    共有
                    <span class='total-active'>{{ total.num }}</span>
                    件商品
                </div>
                <div>
                    <span>总计：</span>
                    <span class='total-active'>¥{{ total.price.toFixed(2) }}</span>
                </div>
            </div>
            <div class='order' v-if="!isNav" @click="goOrder">去结算</div>
            <div class='order' v-else @click="delGoodsFn">删除</div>
        </footer>
    </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import request from '@/components/common/api/request'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { Toast } from 'vant'
export default {
    name: "CartView",
    data() {
        return {
            checked: true,
            isNav: false,
        }
    },
    computed: {
        ...mapState({
            cartlist: state => state.cart.list,
            selectlist: state => state.cart.selectlist,
        }),
        ...mapGetters(['isCheckAll', 'total']),
        goodsList() {
            return this.selectlist.map(item => {
                return this.cartlist.find(v => v.id == item)
            })
        }
    },
    created() {
        this.getData();
    },
    methods: {
        ...mapMutations(['CART_LIST', 'CHECK_ITEM', 'INIT_ORDER']),
        ...mapActions(['checkallFn', 'delGoodsFn']),
        //当前用户的购物车数据
        goback() {
            this.$router.replace('/home');
        },
        async getData() {
            let res = await request.$axios(
                {
                    url: '/api/selectCart',
                    method: 'POST',
                    headers: {
                        token: true
                    },
                }
            )
            console.log(res);
            if (!res.data.success) {
                return;
            }
            res.data.data.forEach(v => {
                v['checked']= false;
            })
            console.log(res.data.data);
            this.CART_LIST(res.data.data);
        },

        isNavBar() {
            this.isNav = !this.isNav;
        },
        changeNum(value, item) {
            //value 修改后的数量
            //item.id 购物车商品id
            request.$axios(
                {
                    url: '/api/updateNum',
                    method: 'POST',
                    data: {
                        num: value,
                        id: item.id,
                    },
                    headers: {
                        token: true
                    }
                }
            ).then(res => {
                console.log(res);
            })
        },
        //去结算
        goOrder() {
            if (this.selectlist.length > 0) {
                //获取选中的商品
                let newCart = [];
                console.log(this.cartlist);
                this.cartlist.forEach((item) => {
                    this.selectlist.filter((v) => {
                        if (v == item.id) {
                            newCart.push(item)
                        }
                    })
                })
                console.log(newCart);
                //生成订单
                request.$axios(
                    {
                        url: '/api/addOrder',
                        method: 'POST',
                        headers: {
                            token: true,
                        },
                        data: {
                            orderlist: newCart
                        }
                    }
                ).then(res => {
                    Toast(res.data.msg);
                    console.log(res.data.data);
                    if (res.data.success) {
                        this.INIT_ORDER(res.data.data);
                    }
                    this.$router.push({
                        name: 'Order',
                        query: {
                            detail: JSON.stringify(this.selectlist),
                            goodslist: JSON.stringify(this.goodsList),
                        }
                    });
                })
            } else {
                Toast('请选至少选择一件商品进行结算');
                return;
            }
        }
    },
    components: { Tabbar },
}
</script>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.173333rem;
    color: #fff;
    background-color: #b0352f;

    i {
        padding: 0 0.4rem;
        font-size: 0.586666rem;
    }

    span {
        padding: 0 0.4rem;
        font-size: 0.426666rem;
    }
}

section {
    background-color: #f5f5f5;

    .cart-title {
        display: flex;
        padding: 0.533333rem;

        span {
            padding: 0 0.4rem;
            font-weight: 500;
            font-size: 0.48rem;
        }
    }

    ul {
        display: flex;
        flex-direction: column;

        li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.16rem 0.533333rem;
            margin: 0.213333rem 0;
            background-color: #fff;

            .check {
                padding-right: 0.373333rem;
            }

            .goods {
                display: flex;
                flex-direction: column;
                padding-left: .4rem;
                font-size: 0.32rem;

                .goods-title {
                    display: flex;

                    i {
                        font-size: 0.586666rem;
                    }
                }

                .goods-price {
                    padding: 0.08rem 0;
                    color: #b0352f;
                }

                ::v-deep .van-stepper {
                    text-align: right;
                }
            }

            img {
                width: 1.973333rem;
                height: 1.973333rem;
            }
        }
    }
}

footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.28rem;
    border-top: 0.053333rem solid #ccc;

    .radio {
        padding: 0 0.4rem;
    }

    .total {
        flex: 1;
        font-size: 0.32rem;

        .total-active {
            color: #b0352f;
        }
    }

    .order {
        width: 3.2rem;
        line-height: 1.28rem;
        color: #fff;
        text-align: center;
        font-size: 0.426666rem;
        background-color: #b0352f;
    }
}
</style>