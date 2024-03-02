import store from "@/store";
import axios from "axios";
import { Indicator } from 'mint-ui';
import router from '@/router'
export default {
    common: {
        method: 'GET',
        data: {},
        params: {},
        headers: {},
    },
    $axios(option = {}) {

        option.method = option.method || this.common.method;
        option.data = option.data || this.common.data;
        option.params = option.params || this.common.params;
        option.headers = option.headers || this.common.headers;
        Indicator.open('加载中...');
        //是否是登录状态
        if (option.headers.token) {
            option.headers.token = store.state.user.token;
            if (!option.headers.token) {
                router.push('/login');
            }
        }
        return axios(option).then(res => {
            let data = res.data;
            if (data.code == 1000) {
                Indicator.close();
                return router.push('/login');
            }
            return new Promise((resolve, reject) => {
                if (!res) {
                    return reject()
                }
                setTimeout(() => {
                    Indicator.close();
                }, 500);
                resolve(res);
            })


        })
    }
}