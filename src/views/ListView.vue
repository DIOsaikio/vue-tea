<template>
    <div class="list">
        <Header v-if="isShow"></Header>
        <section>
            <div class="list-l" ref="left">
                <ul class="l-item">
                    <li :class="currentindex == index ? 'active' : ''" v-for="(item, index) in leftList" :key="index"
                        @click="goScroll(index)">
                        {{ item.name }}</li>
                </ul>
            </div>
            <div class="list-r" ref="right">
                <ul class="shop-list" ref="shop">
                    <li v-for="(item, index) in rightList" :key="index" class="list-item">
                        <h2>{{ item.name }}</h2>
                        <ul class="r-content">
                            <li v-for="(v, k) in item.list" :key="k">
                                <img :src="v.imgUrl" alt="">
                                <span>{{ v.name }}</span>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </section>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/List/Header.vue'
import request from '@/components/common/api/request'
//滚动插件
import BetterScroll from 'better-scroll'
export default {
    name: "ListView",
    data() {
        return {
            isShow:true,
            leftList: [],//左侧数据
            rightList: [],//右侧数据
            /*  currentindex: 0, */
            rightScroll: '',
            allHeight: [],//右侧所有分类的高度值,
            scrollY: '',//滚动后的距离
        }
    },
    
    computed: {
        currentindex() {
            return this.allHeight.findIndex((item, index) => {
                return this.scrollY >= item && this.scrollY < this.allHeight[index + 1];
            })
        }
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            let leftArr = [];
            let rightArr = [];
            let { data } = await request.$axios({ url: '/api/goods/list' });
            data.data.forEach(v => {
                leftArr.push({
                    id: v.id,
                    name: v.name,
                })
                rightArr.push(v.data);
            })
            this.leftList = Object.freeze(leftArr);
            this.rightList = Object.freeze(rightArr);
            //当dom加载完执行里面代码
            this.$nextTick(() => {
                new BetterScroll(this.$refs.left, {
                    click: true, 
                    movable: true,
                    zoom: true,
                    bounce:false,
                });
                this.rightScroll = new BetterScroll(this.$refs.right, {
                    click: true, movable: true,
                    zoom: true,
                    probeType: 3,
                    bounce:false,
                });
                let height = 0;
                this.allHeight.push(height);
                let uls = this.$refs.shop.getElementsByClassName('list-item');
                Array.from(uls).forEach(v => {
                    height += v.clientHeight;
                    this.allHeight.push(height);
                })
                console.log(this.allHeight);
                this.rightScroll.on('scroll', (pos) => {
                    if(Math.abs(pos.y)>50){
                        this.isShow=false;
                    }else{
                        this.isShow=true;
                    }
                    this.scrollY = Math.abs(pos.y);
                    console.log(this.scrollY);
                })
            })


        },
        goScroll(index) {
            this.currentindex = index;
            console.log(index);
            this.rightScroll.scrollTo(0, -this.allHeight[index], 300)

        }
    },
    components: { Tabbar, Header },
}
</script>

<style scoped lang="scss">
.list {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;

    section {
        padding-top: .1333rem;
        display: flex;
        flex: 1;
        overflow: hidden;

        .list-l {
            width: 2.48rem;
            background-color: #fff;
            overflow: hidden;
            border-right: .0533rem solid #ccc;

            .l-item {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                li {
                    width: 100%;
                    text-align: center;
                    padding: .1333rem 0;
                    margin: .5333rem 0;
                    font-size: .3733rem;
                    font-weight: 700;
                }
            }
        }

        .list-r {
            flex: 1;
            width: 100%;
            height: 100%;
            overflow: hidden;

            .shop-list {
                text-align: center;

                li {
                    h2 {
                        padding: .4rem 0;
                        font-size: .6667rem;
                        font-weight: 400;
                    }

                    .r-content {
                        display: flex;
                        flex-wrap: wrap;

                        li {
                            width: 33.3%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                            padding: .2667rem 0;

                            img {
                                width: 1.4133rem;
                                height: 1.4133rem;
                            }

                            span {
                                font-size: .4267rem;
                            }
                        }
                    }
                }
            }
        }
    }
}

.active {
    border-left: .16rem solid #b54f4a;
    color: #b54f4a;
}

::v-deep.tabbar {
    border-top: .0533rem solid #ccc;
}
</style>