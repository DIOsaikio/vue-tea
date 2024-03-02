<template>
    <div class='my container'>
        <header>
            <div class='user-info' v-if='loginStatus'>
                <img :src="userInfo.imgUrl" alt="">
                <span>{{ userInfo.nickName }}</span>
            </div>
            <div  v-else class='login' @click='goLogin'>登录/注册</div>
        </header>
        <section>
            <ul>
                <li @click="goAddress">地址管理</li>
                <li v-if='loginStatus' @click='loginOut'>退出登录</li>
            </ul>
        </section>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import { Toast } from 'mint-ui';
import { mapState,mapMutations } from 'vuex'
export default {
    name: "MyView",
    components: { Tabbar },
    computed: {
        ...mapState({
            userInfo: state => state.user.userinfo,
            loginStatus:state=>state.user.loginStatus
        })
    },
    methods: {
        ...mapMutations(['LOGIN_OUT']),
        goLogin() {
            this.$router.push('/login')
        },
        loginOut(){
            this.$store.commit('LOGIN_OUT');
            Toast('退出成功')
        },
        goAddress(){
            this.$router.push('/address')
        }
    },
}
</script>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 4.266666rem;
    background-color: #B0352F;

    .login {
        padding: 0.16rem 0.4rem;
        font-size: 0.426666rem;
        color: #fff;
        background-color: #F6AB32;
        border-radius: 6px;
    }

    .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
            width: 1.76rem;
            height: 1.76rem;
            border-radius: 50%;
        }

        span {
            padding: 0.533333rem 0;
            font-size: 0.48rem;
            color: #fff;
        }
    }
}

section {
    flex: 1;
    overflow: hidden;

    ul li {
        padding: 0.4rem;
        font-size: 0.426666rem;
    }
}</style>