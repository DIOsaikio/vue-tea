<template>
    <div class='login container'>
        <Header>
            <span>注册</span>
        </Header>
        <section>
            <div class='login-tel'>
                <input type="text" v-model='userTel' placeholder="请输入手机号" pattern="[0-9]*">
            </div>
            <div class='login-code'>
                <input type="text" placeholder="请输入短信验证码" pattern="[0-9]*" v-model=' telCode'>
                <button :disabled="disabled" @click='sendCode'>{{ codeMsg }}</button>
            </div>
            <div class='login-tel'>
                <input type="text" v-model='userPwd' placeholder="请设置密码" pattern="[0-9]*">
            </div>
            <div class='login-btn' @click='register'>注 册</div>
        </section>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue'
import Header from './Header'
import request from '@/components/common/api/request'
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            disabled: false,
            userTel: '',
            userPwd: '',
            telCode: '',
            //验证规则
            rules: {//手机号验证
                userTel: {
                    rule: /^1[23456789]\d{9}$/,
                    msg: '手机号不能为空，并且是11位数字'
                },
                userPwd: {
                    rule: /^\w{6,12}$/,
                    msg: '密码不能为空，并且是6-12位'
                }
            },
            time: 6,
            codeMsg: '获取短信验证码',
            code: ''
        }
    },
    components: { Tabbar, Header },
    methods: {
        register(){
            if (!this.validate('userPwd')) return;
            if (this.code != this.telCode) {
                Toast('验证码错误');
                return;
            }
            request.$axios(
                {
                    url:'/api/register',
                    method:'POST',
                    data:{
                        userTel:this.userTel,
                        userPwd:this.userPwd,
                    }
                }
            ).then(res=>{
                console.log(res);
                /* Toast(res.data.data.msg) */
            })
        },
        sendCode(){
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
}
</style>