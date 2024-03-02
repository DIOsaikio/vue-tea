import { LOGIN, INIT_USER, LOGIN_OUT } from "./mutations-types"
export default {
    state: {
        //登录状态
        loginStatus: false,
        token: null,
        userinfo: {}
    },
    getters: {},
    mutations: {
        [LOGIN](state, user) {
            console.log(user);
            state.loginStatus = true;
            state.token = user.token
            state.userinfo = user;
            localStorage.setItem('userinfo', JSON.stringify(user))
        },
        [INIT_USER](state) {
            let userinfo = JSON.parse(localStorage.getItem('userinfo'));
            if (userinfo) {
                state.loginStatus = true;
                state.token = userinfo.token
                state.userinfo = userinfo;
            }
        },
        [LOGIN_OUT](state) {
            localStorage.removeItem('userinfo');
            state.loginStatus = false;
            state.token = null,
            state.userinfo = {}
        }
    },
    actions: {},
}