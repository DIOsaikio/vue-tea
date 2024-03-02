import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//css文件
import '@/assets/css/common.css'
import '@/assets/js/flexible'
//字体图标
import '@/assets/css/iconfont.css'
//全局引入 mintui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
//全局引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
//全局引入 fastclick
import FastClick from 'fastclick';
FastClick.attach(document.body);
Vue.use(Vant);

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
