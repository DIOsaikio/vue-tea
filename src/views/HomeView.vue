<template>
    <div class="home">
        <div class="header">
            <Header></Header>
            <ly-tabs v-model="value" activeColor="#b0352f" @change="changeTab">
                <ly-tab-item v-for="(item, index) in tabList" :key="index" :name="index" :title="item.title" />
            </ly-tabs>
        </div>
        <section class="wapper">
            <div>
                <div v-for="(item, index) in newData" :key="index">
                    <Swiper v-if="item.type == 'swiperList'" :swiperList="item.data"></Swiper>
                    <Icons v-if="item.type == 'iconList'" :iconList="item.data"></Icons>
                    <Recommend v-if="item.type == 'recommendList'" :recommendList="item.data"></Recommend>
                    <Ad v-if="item.type == 'AdList'" :AdList="item.data"></Ad>
                    <Likes v-if="item.type == 'likeList'" :likeList="item.data"></Likes>
                </div>
            </div>
        </section>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
//滚动插件
import BetterScroll from 'better-scroll'
//axios
import axios from 'axios'
//home组件
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/Home/Header.vue'
import Swiper from '@/components/Home/Swiper.vue'
import Icons from '@/components/Home/Icons.vue'
import Recommend from '@/components/Home/Recommend.vue'
import Likes from '@/components/Home/Likes.vue'
import Ad from '@/components/Home/Ad.vue'
//tab栏插件
import { LyTabs, LyTabBar, LyTabItem } from 'ly-tab';
//loading

import request from '@/components/common/api/request'
export default {
    name: "HomeView",
    data() {
        return {
            activeColor: '#b0352f',
            value: 0,
            tabList: [],
            newData: [],
        }
    },
    components: {
        Tabbar,
        Header,
        Swiper,
        Icons,
        Recommend,
        Likes,
        Ad,
        LyTabs,
        LyTabBar,
        LyTabItem,
    },
    created() {
        this.getData();
    },
    mounted() {

    },
    methods: {
        changeTab(index) {
            this.addData(index);
        },
        async addData(index) {
            let res = await request.$axios({ url: '/api/index_list/' + index + '/data/1' })
            if (res.status == 200) {
                this.newData = Object.freeze(res.data.newdata);
                //当dom加载完执行里面代码
                this.$nextTick(() => {
                    let bs = new BetterScroll('.wapper', {
                        click:true,
                        movable: true,
                        zoom: true
                    })
                })
            }
        },
        async getData() {
           
            let res = await request.$axios({url: '/api/index_list/0/data/1'});
            /* console.log(res); */
            if (res.status == 200) {
                this.tabList = Object.freeze(res.data.topBar);
                this.newData = Object.freeze(res.data.newdata);
                this.$nextTick(() => {
                    let bs = new BetterScroll('.wapper', {
                        click:true,
                        movable: true,
                        zoom: true
                    })
                })
            } 
        }
    }
};

</script>

<style scoped lang="scss">
.home {
    display: flex;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    overflow: hidden;

    .header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        width: 100%;
        height: 2.72rem;
    }

    .ly-tabs {
        height: 1.28rem;
        border: none;
    }

    section {
        flex: 1;
        overflow: hidden;
        margin-top: 2.72rem;
    }
}
</style>