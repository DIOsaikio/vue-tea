<template>
    <div class="search-index">
        <Header></Header>
        <section>
            <div class="search-history" v-if="searchArr.length != 0">
                <h2>
                    <div class="history">
                        <i class="iconfont icon-shijian"></i>
                        <span>历史搜索</span>
                    </div>
                    <div class="clear" @click="clearStorage">
                        <span>清空搜索记录</span>
                    </div>
                </h2>
                <ul>
                    <li v-for="(item, index) in searchArr" :key="index" @click="goSearch(item)">
                        {{ item }}
                    </li>

                </ul>
                <hr>
            </div>
            <div v-else>暂无数据</div>

        </section>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from '@/components/Search/Header.vue'
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            searchArr: [],
        }
    },
    created() {
        this.searchArr = JSON.parse(localStorage.getItem('searchList')) || []
    },
    methods: {
        clearStorage() {
            console.log(111);
            MessageBox({
                title: '提示',
                message: '确定执行此操作?',
                showCancelButton: true
            }).then(res=>{
                if(res=='confirm'){
                    //清除缓存
                    localStorage.removeItem('searchList')
                    this.searchArr=[];
                }
            });
        },
        goSearch(item){
            this.$router.push({
                name: 'list',
                query:{
                    keyword:item,
                }
            });
        }
    },
    components: { Tabbar, Header }
}
</script>

<style scoped lang="scss">
.search-index {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    section {
        flex: 1;
        overflow: hidden;
        background-color: #f4f4f4;

        .search-history {

            padding: .4rem;

            h2 {
                display: flex;
                justify-content: space-between;
                font-weight: 400;
                font-size: 0.48rem;

                .history {
                    i {
                        padding-right: .08rem;
                        color: red;
                    }

                }

                .clear {
                    span {
                        font-size: .3733rem;
                    }
                }
            }

            ul {

                display: flex;
                flex-wrap: wrap;
                padding: .2667rem 0;
                margin-left: -0.2667rem;

                li {
                    margin: .2667rem;
                    padding: .08rem .16rem;
                    font-size: .3733rem;
                    border: 1px solid #ccc;
                }
            }
        }
    }
}
</style>