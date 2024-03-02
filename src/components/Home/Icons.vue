<template>
    <ul class="icons-content">
        <li v-for="(item, index) in iconList" :key="index">
            <img :src="item.imgUrl" alt="">
            <span>{{ item.title }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Icons',
    props: {
        iconList: {
        },
    },
    data() {
        return {
        }
    }
}
</script>

<style scoped lang="scss">
.icons-content {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;

    li {
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
            width: .96rem;
            height: .96rem;
        }

        span {
            padding: 6px 0;
            font-size: .4267rem;
        }
    }
}
</style>