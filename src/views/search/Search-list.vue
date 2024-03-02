<template>
    <div class="search-list">
        <div class="header">
            <Header></Header>
            <ul>
                <li v-for="(item, index) in serechTab.data" :key="index" @click="changeTab(index)">
                    <div :class="serechTab.currentindex == index ? ' active' : ''">{{ item.name }}</div>
                    <div class="search-filter" v-if="index != 0">
                        <i class="iconfont  icon-shaixuanjiantou1" :class="item.status == 1 ? ' active' : ''"></i>
                        <i class="iconfont  icon-shaixuanjiantou" :class="item.status == 2 ? ' active' : ''"></i>
                    </div>
                </li>
            </ul>
        </div>
        <section class="wrapper">
            <div>
                <ul v-if="goodsList.length">
                    <li v-for="(item, index) in goodsList" :key="index">
                        <img v-lazy="item.imgUrl" alt="">
                        <h3>{{ item.content }}</h3>
                        <div class="info">
                            <div class="price">
                                <b>￥</b>
                                <span>{{ item.price }}</span>
                            </div>
                            <div class="buy">立即购买</div>
                        </div>
                    </li>
                </ul>
                <h1 v-else>暂无数据...</h1>
            </div>
        </section>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/Search/Header.vue'
import request from '@/components/common/api/request'
import BetterScroll from 'better-scroll'
export default {
    data() {
        return {
            goodsList: [],
            serechTab: {
                currentindex: 0,
                data: [
                    /*  status:0 箭头都不亮
                        status:1 上箭头亮
                        status:2 下箭头亮
                    */
                    { name: '综合', key: 'zh' },
                    { name: '价格', status: 0, key: 'price' },
                    { name: '销量', status: 0, key: 'sale' },
                ]
            }
        }
    },
    computed: {
        //判断箭头对应升序还是降序
        orderBy() {
            let obj = this.serechTab.data[this.serechTab.currentindex];
            let val = '';
            if (this.serechTab.currentindex != 0) {
                val = obj.status == '1' ? 'asc' : 'desc';
            } else {
                val = 'asc'
            }
            return {
                [obj.key]: val,
            }
        }
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            let res = await request.$axios({
                url: '/api/goods/shopList',
                params: {
                    searchName: this.$route.query.keyword,
                    ...this.orderBy,
                }
            })
            this.goodsList = res.data.data;
            this.$nextTick(() => {
                let bs = new BetterScroll('.wrapper')
            })
            console.log(res);
        },
        changeTab(index) {
            this.serechTab.currentindex = index;
            let item = this.serechTab.data[index];
            this.serechTab.data.forEach((v, i) => {
                if (i != index) {
                    v.status = 0;
                }
            })
            if (this.serechTab.currentindex === index) {
                item.status = item.status == 1 ? 2 : 1;
                this.getData();
            }
        }

    },
    watch: {
        $route(to, from) {
            this.getData();
        }
    },
    components: { Tabbar, Header }
}
</script>

<style scoped lang="scss">
.search-list {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .header {
        ul {
            display: flex;
            align-items: center;
            justify-content: space-around;
            font-size: .3733rem;
            padding: .2667rem 0;

            li {
                display: flex;
                justify-content: center;
                align-items: center;

                div {
                    padding: 0 .1333rem
                }

                ;

                .search-filter {
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }

    section {
        flex: 1;
        overflow: hidden;
        background-color: #f4f4f4;

        ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            li {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                width: 50%;

                img {
                    width: 4.5333rem;
                    height: 4.5333rem;
                }

                img[lazy=loading] {
                    background-color: #f7f7f7;
                }

                h3 {
                    box-sizing: border-box;
                    width: 100%;
                    font-weight: 400;
                    font-size: .4267rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding: .1333rem;

                }

                .info {
                    box-sizing: border-box;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: .4267rem;
                    padding: .1333rem .2667rem;

                    .price {
                        b {
                            color: #99382f;
                            font-size: .3733rem;
                        }

                        span {
                            color: #99382f;
                            font-size: .5333rem;
                        }
                    }

                    .buy {
                        padding: 0 .1333rem;
                        border-radius: .1333rem;
                        font-size: .4267rem;
                        color: #fff;
                        background-color: #99382f;
                    }
                }
            }
        }
    }
}

.active {
    color: red;
}
</style>