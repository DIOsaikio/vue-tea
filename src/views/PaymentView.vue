<template>
    <div>
        <div v-if="paymentStatus">支付成功</div>
        <div v-else="paymentStatus">支付失败</div>
        <div>{{ time }}秒后返回首页</div>
    </div>
</template>

<script>
import request from '@/components/common/api/request'
import qs from 'qs'
export default {
    data() {
        return {
            paymentStatus: false,
            time: 3,
        }
    },
    created() {
        this.getDate();
    },
    methods: {
        getDate() {
            let data = {
                out_trade_no: this.$route.query.out_trade_no,
                trade_no: this.$route.query.trade_no,
            }
            request.$axios(
                {
                    url: '/api/successPayment',
                    method: 'POST',
                    data: qs.stringify(data),
                    headers: {
                        token: true,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                }
            ).then(res => {
                console.log(res);
                if (res.data.code == 10002) {
                    this.paymentStatus = true;

                }
                let timer = setInterval(() => {
                    --this.time;
                }, 1000);
                setTimeout(() => {
                    clearInterval(timer);
                    this.time = 3;
                    this.$router.replace('/home');
                }, 3000)
            })
        }
    }
}
</script>

<style></style>