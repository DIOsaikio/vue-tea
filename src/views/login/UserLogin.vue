<template>
    <div class='login container'>
        <Header></Header>
        <section>
            <div class='login-tel'>
                <input type="text" v-model='userTel' placeholder="请输入手机号" pattern="[0-9]*">
            </div>
            <div class='login-tel'>
                <input type="text" v-model='userPwd' placeholder="请输入密码">
            </div>
            <div class='login-btn' @click='login'>登 录</div>
            <div class='tab'>
                <span @click='goLogin'>短信登录</span>
                <span @click="goRecover">找回密码</span>
                <span>快速注册</span>
            </div>
        </section>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from './Header'
import request from '@/components/common/api/request'
import { Toast } from 'mint-ui';
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            userTel: '',
            userPwd: '',
            rules: {
                userTel: {
                    rule: /^1[23456789]\d{9}$/,
                    msg: '手机号不能为空,并且是11位数字'
                },
                userPwd: {
                    rule: /^\w{6,12}$/,
                    msg: '密码不能为空,并且是6到9位数字'
                }
            }
        }
    },
    components: { Tabbar, Header },
    methods: {
        ...mapMutations(['USER_LOGIN']),
        login() {
            if (!this.validate('userTel')) return;
            if (!this.validate('userPwd')) return;
            request.$axios({
                url: '/api/login',
                method: 'POST',
                data: {
                    userTel: this.userTel,
                    userPwd: this.userPwd,
                }
            }).then(res => {
                Toast(res.data.data.msg);
                if (!res.data.data.success) return;
                this.USER_LOGIN(res.data.data.data);
                this.$router.push('/my');
                this.userTel='';
                this.userPwd='';
            })
        },
        goLogin() {
            this.$router.push('/login')
        },
        validate(key) {
            let bool = true;
            if (!this.rules[key].rule.test(this[key])) {
                Toast(this.rules[key].msg)
                bool = false;
                return bool;
            }
            return bool
        },
        goRecover(){
            this.$router.push('/recover');
        }
    },
}
</script>

<style scoped lang="scss">
section {
    display: flex;
    font-size:.32rem;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;

    div {
        margin: 0.266666rem 0;
        width: 8.933333rem;
        height: 1.173333rem;
    }

    input {
        box-sizing: border-box;
        padding: 0 0.266666rem;
        line-height: 1.173333rem;
        background-color: #FFFFFF;
        border: 1px solid #ccc;
        border-radius: 6px;
    }

    .login-tel {
        margin-top: 0.8rem;

        input {
            width: 8.933333rem;
        }
    }

    .login-code {
        display: flex;

        input {
            flex: 1;
        }

        button {
            padding: 0 0.533333rem;
            line-height: 1.173333rem;
            color: #fff;
            background-color: #b0352f;
            border: 0;
            border-radius: 6px;
        }
    }

    .login-btn {
        line-height: 44px;
        color: #fff;
        text-align: center;
        background-color: #b0352f;
        border-radius: 6px;
    }

    .tab {
        display: flex;
        justify-content: space-between;
        font-size: 0.373333rem;
    }
}
</style>