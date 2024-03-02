<template>
    <div class="swiper-content">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(image, index) in swiperList " :key="index" class="swiper-main">
                <img :src="image.imgUrl" alt="">
                <div class="swiper-pagination"></div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    props:{swiperList:{}},
    name: 'Swiper',
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
                    clickable: true, //轮播按钮支持点击
                },
            },
        }
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style scoped lang="scss">
.swiper-content {
    width: 100%;
    height: 4.4rem;

    .swiper-main {
        img {
            width: 100%;
            height: 100%;
        }

        .swiper-pagination {
            width: 100%;
            bottom: .2667rem;

            ::v-deep .swiper-pagination-bullet {
                margin: 0 .1333rem;
                background-color: #fff;
            }

            ::v-deep .swiper-pagination-bullet-active {
                background-color: #b0352f;
            }

        }


    }
}
</style>