
<template>
    <div class='login container'>
        <Header></Header>
        <section>
            <div class='login-tel'>
                <input v-model="userTel" type="text" placeholder="请输入手机号" pattern="[0-9]*">
            </div>
            <div class='login-code'>
                <input type="text" v-model="telCode" placeholder="请输入短信验证码" pattern="[0-9]*">
                <button @click="getCode" :disabled="disabled">{{ codeMsg }}</button>
            </div>
            <div class='login-btn' @click="login">登 录</div>
            <div class='tab'>
                <span @click='goUserLogin'>密码登录</span>
                <span @click='goRegister'>快速注册</span>
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
            disabled: false,
            userTel: '',
            telCode: '',
            code: '',
            time: 6,
            codeMsg: '获取短信验证码',
            rules: {
                userTel: {
                    rule: /^1[23456789]\d{9}$/,
                    msg: '手机号不能为空,并且是11位数字'
                }
            }
        }
    },
    components: { Tabbar, Header },
    methods: {
        ...mapMutations(['USER_LOGIN']),
        goUserLogin() {
            this.$router.push('/UserLogin')
        },
        getCode() {
            if (!this.validate('userTel')) return;
            //请求短信验证码接口
            request.$axios({
                url: '/api/code',
                method: 'POST',
                data: {
                    phone: this.userTel,
                }
            }).then(res => {
                this.code = res.data.data.data;
                this.disabled = true;
                let timer = setInterval(() => {
                    --this.time;
                    this.codeMsg = `重新发送 ${this.time}`;
                }, 1000);
                setTimeout(() => {
                    clearInterval(timer);
                    this.time = 6;
                    this.disabled = false;
                    this.codeMsg = '获取短信验证码';
                }, 6000)
            })

        },
        login() {
            if (this.code == this.telCode) {
                Toast('登录成功');
                request.$axios(
                    {
                        url: '/api/addUser',
                        method: 'POST',
                        data: {
                            phone: this.userTel,
                        }
                    }
                ).then(res => {
                    Toast(res.data.data.msg);
                    if (!res.data.data.success) return;
                    this.USER_LOGIN(res.data.data.data);
                    this.$router.push('/my');
                })
            }
        },
        goRegister() {
            this.$router.push('/register');
        },
        validate(key) {
            let bool = true;
            if (!this.rules[key].rule.test(this[key])) {
                Toast(this.rules[key].msg)
                bool = false;
                return bool;
            }
            return bool
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