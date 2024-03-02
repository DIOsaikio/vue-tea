<template>
    <div class="tabbar">
        <ul>
            <li v-for="(item, index) in routerList" :key="index" @click="switchTab(item.path)">
                <img :src="$route.path.includes(item.path) ? item.selected : item.active" alt="">
                <span :class="$route.path.includes(item.path) ? 'active' : ''">{{ item.title }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Tabbar',
    data() {
        return {
            routerList: [{
                title: '首页',
                path: '/home',
                active: '/images/home.png',
                selected: '/images/home-select.png'
            },
            {
                title: '分类',
                path: '/list',
                active: '/images/list.png',
                selected: '/images/list-select.png'
            },
            {
                title: '购物车',
                path: '/cart',
                active: '/images/cart.png',
                selected: '/images/cart-select.png'
            },
            {
                title: '我的',
                path: '/my',
                active: '/images/my.png',
                selected: '/images/my-select.png'
            },
            ]
        }
    },
    methods: {
        switchTab(path) {
            //判断是否点击同一个路由
            if (this.$route.path == path) {
                return
            } else {
                this.$router.replace(path)
            }

        }
    },
}
</script>

<style scoped  lang="scss">
.tabbar {
    position: fixed;
    left: 0;
    bottom:0;
    z-index: 999;
    width: 100%;
    height: 1.3333rem;
    background-color: #fff;

    ul {
        display: flex;
        justify-content: space-around;

        li {
            display: flex;
            flex-direction: column;
            align-items: center;

            img {
                width: .8267rem;
                height: .8267rem;
            }

            span {
                font-size: .3733rem;
                font-weight: 700;
            }
        }
    }

}

.active {
    color: red;
}
</style>