import { INIT_ORDER } from './mutations-types'
export default {
    state: {
        orderlist: [],
        order_id: localStorage.getItem('order_id') || '',
    },
    getters: {},
    mutations: {
        [INIT_ORDER](state, orderlist) {
            state.orderlist = orderlist;
            state.order_id = orderlist[0].order_id;
            localStorage.setItem('order_id', orderlist[0].order_id)
        }
    },
    actions: {},
}