import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
    return originalReplace.call(this, location).catch(err => err)
}
Vue.use(VueRouter);

const routes = [
    {
        path: "/home",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/list",
        name: "List",
        component: () =>
            import(/*webpackChunkName:'list'*/"../views/ListView.vue"),
    },
    {
        path: "/cart",
        name: "Cart",
        component: () =>
            import(/*webpackChunkName:'cart'*/"../views/CartView.vue"),
    },
    {
        path: "/detail",
        name: "Detail",
        meta: {
            keepAlive: true,
        },
        component: () =>
            import(/*webpackChunkName:'detail'*/"../views/DetailView.vue"),
    },
    {
        path: "/my",
        name: "My",
        component: () =>
            import(/*webpackChunkName:'my'*/"../views/MyView.vue"),
    },
    {
        path: "/search",
        children: [
            {
                path: '/',
                name: 'index',
                component: () =>
                    import("../views/search/Serach-index.vue"),
            },
            {
                path: 'searchlist',
                name: 'list',
                component: () =>
                    import("../views/search/Search-list.vue"),
            },

        ],
        component: () =>
            import(/*webpackChunkName:'search'*/"../views/SearchView.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () =>
            import(/*webpackChunkName:'login'*/"../views/login/Login.vue"),
    },
    {
        path: "/userLogin",
        name: "UserLogin",
        component: () =>
            import(/*webpackChunkName:'userLogin'*/"../views/login/UserLogin.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import(/*webpackChunkName:'register'*/"../views/login/Register.vue"),
    },
    {
        path: "/recover",
        children: [
            {
                path: '/',
                name: 'recoverindex',
                component: () =>
                    import("../views/recover/Recover-index.vue"),
            },
            {
                path: 'btn',
                name: 'Btn',
                component: () =>
                    import("../views/recover/RecoverBtn.vue"),
            }
        ],
        component: () =>
            import(/*webpackChunkName:'register'*/"../views/RecoverView.vue"),
    },
    {
        path: "/address",
        children: [
            {
                path: '/',
                name: 'Addressindex',
                component: () =>
                    import("../views/path/Address-index.vue"),
            },
            {
                path: 'addresslist',
                name: 'Addresslist',
                component: () =>
                    import("../views/path/Address-list.vue"),
            }
        ],
        component: () =>
            import(/*webpackChunkName:'addressr'*/"../views/AddressView.vue"),
    },
    {
        path: "/order",
        name: "Order",
        meta: {
            keepAlive: true,
        },
        component: () =>
            import(/*webpackChunkName:'order'*/"../views/OrderView.vue"),
    },
    {
        path: "/payment",
        name: "Payment",
        component: () =>
            import(/*webpackChunkName:'payment'*/"../views/PaymentView.vue"),
    },
];


const router = new VueRouter({
   /*  mode: "history", */
    base: process.env.BASE_URL,
    routes,
});
//全局路由守卫
router.beforeEach((to, from, next) => {
    let nextRoute = ['Payment', 'Cart', 'Addressindex', 'Order', 'Addresslist'];
    //是否是登录中
    let userInfo = JSON.parse(localStorage.getItem('userinfo'));
    //当前进入的页面，是不是需要验证哪些页面
    if (nextRoute.indexOf(to.name) >= 0) {
        if (!userInfo) {
            router.push('/login');
        }
    }

    next();
})
export default router;
