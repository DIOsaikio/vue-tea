<template>
    <div class="like">
        <Card>
            <span>猜你喜欢</span>
        </Card>
        <ul>
            <li v-for='(item, index) in likeList' :key='index' @click="goDetail(item)">
                <h2>
                    <img v-lazy="item.imgUrl" alt="">
                </h2>
                <h3>{{ item.name }}</h3>
                <div>
                    <span>¥</span>
                    <b>{{ item.price }}</b>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Card from '@/components/Home/Card.vue'
import { Lazyload } from 'mint-ui';
export default {
    props: { likeList: {} },
    data() {
        return {

        }
    },
    methods:{
        goDetail(item){
            this.$router.push({path:'/detail',
            query:{
                id:item.id,
            }
        })
        }
    },
    components: { Card }
}
</script>

<style scoped lang="scss">
.like {
    ul {
        display: flex;
        flex-wrap: wrap;

        li {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            width: 50%;

            h2 {
                img {
                    width: 4.6933rem;
                    height: 4.6933rem;
                }

                img[lazy=loading] {
                    background-color: #f7f7f7;
                }
            }

            h3 {
                width: 88%;
                font-size: .4rem;
                color: #222;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-left: .1333rem;
            }

            div {
                width: 88%;
                padding: .16rem;
                text-align: left;
                color: #ba4744;

                span {
                    font-size: .32rem;
                }
            }
        }
    }
}</style>