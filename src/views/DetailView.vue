<template>
    <div class="detail">
        <header>
            <div class="header-return" v-show="isShow">
                <i class="iconfont icon-fanhui" @click="goBack()"></i>
                <i class="iconfont icon-kefu"></i>
            </div>
            <div class="header-bar" v-show="!isShow" :style="styleOption">
                <i class="iconfont icon-fanhui" @click="goBack()"></i>
                <div>
                    <span>商品评价</span>
                    <span>商品列表</span>
                </div>
                <i class="iconfont icon-kefu"></i>
            </div>
        </header>
        <section ref="wrap">
            <div>
                <div class="swiper-content">
                    <swiper :options="swiperOption">
                        <swiper-slide v-for="(image, index) in swiperList " :key="index" class="swiper-main">
                            <img :src="image.imgUrl" alt="">
                            <div class="swiper-pagination"></div>
                        </swiper-slide>
                    </swiper>
                </div>
                <div class='goods-name'>
                    <h1>2021春茶 - 白茶 珍稀白茶1号100g装</h1>
                    <div>性价首选，茶感十足、鲜醇耐泡的大众口粮茶</div>
                </div>
                <div class='goods-price'>
                    <div class='oprice'>
                        <span>¥</span>
                        <b>{{ detailList.price }}</b>
                    </div>
                    <div class='pprice'>
                        <span>价格:</span>
                        <del>¥139</del>
                    </div>
                </div>
                <img style="width: 100%; height:500px;" :src="detailList.imgUrl" alt="">
                <img style="width: 100%; height:500px;" :src="detailList.imgUrl" alt="">
            </div>
        </section>
        <footer>
            <div class="add" @click="addCart">加入购物车</div>
            <div class="buy">立即购买</div>
        </footer>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
//滚动插件
import BetterScroll from 'better-scroll'
import request from '@/components/common/api/request'
import { mapState } from 'vuex'
import { Toast } from 'vant'
export default {
    data() {
        return {
            swiperOption: {
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                speed: 1000,
                loop: true,
                pagination: {
                    el: '.swiper-pagination', //与slot="pagination"处 class 一致
                    type: 'fraction'
                },
            },
            swiperList: [
                {
                    id: 0,
                    imgUrl: './images/like.jpeg'
                },
                {
                    id: 1,
                    imgUrl: './images/like2.jpeg'
                },
                {
                    id: 2,
                    imgUrl: './images/like3.jpeg'
                },
            ],
            isShow: true,
            betterScroll: '',
            styleOption: {},
            detailList: {},
            id: '',
        }
    },
    computed: {
        ...mapState({
            token: store => store.user.token,
        })
    },
    components: { swiper, swiperSlide },
    created() {
        this.getData();
    },
    activated() {
        let id = this.$route.query.id;
        if (id != this.id) {
            this.getData();
        }
    },
    mounted() {
        this.betterScroll = new BetterScroll(this.$refs.wrap, {
            click: true,
            movable: true,
            zoom: true,
            bounce: false,
            probeType: 3,
        });
        this.betterScroll.on('scroll', (pos) => {
            let posY = Math.abs(pos.y);
            console.log(posY);
            let opacity = posY / 200;
            this.styleOption = {
                opacity: opacity > 1 ? 1 : opacity
            }
            if (posY >= 100) {
                this.isShow = false;
            } else {
                this.isShow = true;
            }
        });

    },
    methods: {
        async getData() {
            this.id = this.$route.query.id
            let id = this.$route.query.id;
            let res = await request.$axios({
                url: '/api/goods/id',
                params: { id, }
            })
            this.detailList = res.data.data[0];
            console.log(this.detailList);
        },
        addCart() {
            request.$axios(
                {
                    url: '/api/addCart',
                    method: 'POST',
                    data: {
                        goodsId: this.id,

                    },
                    headers: {
                        token: true,
                    }
                }
            ).then(res => {
               
            })
        },
        goBack() {
            this.$router.back();
        },
    },

}
</script>

<style scoped lang="scss">
.detail {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;

    header {
        width: 100%;
        height: 1.1733rem;
        left: 0;
        top: 0;
        z-index: 999;
        position: fixed;

        .header-return {
            width: 100%;
            height: 1.1733rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            i {
                width: .9067rem;
                height: .9067rem;
                color: #fff;
                line-height: .9067rem;
                background-color: rgba(0, 0, 0, .4);
                border-radius: 50%;
                text-align: center;
                font-size: .4267rem;
                margin: .2667rem .2667rem;
            }
        }

        .header-bar {
            width: 100%;
            height: 1.1733rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;

            div {
                height: 1.1733rem;

                span {
                    line-height: 1.1733rem;
                    ;
                    font-size: .4267rem;
                    font-weight: 700;
                    margin: 0 .1333rem;
                }
            }

            i {
                width: .9067rem;
                height: .9067rem;
                line-height: .9067rem;
                text-align: center;
                font-size: .4267rem;
                margin: .1333rem .2667rem;
            }

        }
    }

    section {
        flex: 1;
        overflow: hidden;

        .swiper-content {
            width: 100%;
            height: 10rem;

            .swiper-main {
                overflow: hidden;

                img {
                    width: 100%;
                    height: 10rem;
                }

                .swiper-pagination {
                    width: 100%;
                    text-align: right;
                    bottom: .1333rem;
                    color: #fff;
                    font-size: .4267rem;

                }

                ::v-deep.swiper-pagination-fraction,
                .swiper-pagination-custom,
                .swiper-container-horizontal>.swiper-pagination-bullets {
                    left: -0.2667rem
                }
            }
        }

        .goods-name {
            padding: 0.533333rem 0.266666rem;
            border-bottom: 1px solid #CCCCCC;

            h1 {
                font-size: 0.533333rem;
                font-weight: 500;
            }

            div {
                padding: 0.08rem 0;
                font-size: 0.373333rem;
                color: #999999;
            }
        }

        .goods-price {
            padding: 0.533333rem 0.266666rem;

            .oprice {
                color: red;

                span {
                    font-size: 0.32rem;
                }
            }

            .pprice {
                color: #999999;
                font-size: 0.373333rem;
            }
        }
    }



    footer {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 1.3067rem;
        border-top: .0267rem solid #cccccc;
        background-color: #fff;

        div {
            text-align: center;
            font-size: .4267rem;
            width: 50%;
            line-height: 1.3067rem;

            &.add {
                background-color: #e9923e;
            }

            &.buy {
                background-color: #d83826;
            }
        }
    }
}
</style>