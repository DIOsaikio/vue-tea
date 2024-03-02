<template>
    <div class="recommend">
       <Card></Card>
        <ul>
            <li v-for="(item, index) in recommendList " :key="index">
                <h2>
                    <img :src="item.imgUrl" alt="">
                </h2>
                <div class="info">
                    <div class="name">
                        <h3>{{ item.name }}</h3>
                        <p>{{ item.content }}</p>
                    </div>
                    <div class="price">
                        <span>¥</span>
                        <b>{{ item.price }}</b>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import Card  from '@/components/Home/Card.vue'
export default {
    props:{
        recommendList:{},
    },
    data() {
        return {
           
        }
    },
    components:{Card}
}
</script>

<style scoped lang="scss">
.recommend {
    ul {
        li {
            position: relative;

            h2 {
                text-align: center;

                img {
                    width: 9.6rem;
                    height: 3.84rem;
                    border-radius: .32rem;
                }
            }

            .info {

                position: absolute;
                top: 0;
                right: 0;
                padding: .5333rem;

                .name {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;

                    h3 {
                        font-weight: normal;
                        font-size: .34rem;
                    }

                    p {
                        font-size: .4267rem;
                    }
                }

                .price {
                    color: #ca3c3f;
                    margin-top: .5333rem;
                    text-align: right;
                    ;

                    span {
                        font-size: .3733rem;
                    }
                }
            }
        }
    }
}</style>