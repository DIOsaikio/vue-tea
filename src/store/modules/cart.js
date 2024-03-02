import { CART_LIST, CHECK_ALL, UN_CHECK_ALL, CHECK_ITEM } from "./mutations-types"
import { Toast } from 'vant'
import { Dialog } from 'vant';
import request from '@/components/common/api/request'
export default {
    state: {
        //获取的数据
        list: [],
        //check=true的数据
        selectlist: [],
    },
    getters: {
        isCheckAll(state) {
            return state.list.length == state.selectlist.length
        },
        total(state) {
            let total = {
                num: 0,
                price: 0,
            };
            state.list.forEach(v => {
                if (v.checked) {
                    total.num += parseInt(v.goods_num);
                    total.price += parseInt(v.goods_price) * parseInt(v.goods_num);
                }
            })
            return total;
        }
    },
    mutations: {
        //获取购物车列表
        [CART_LIST](state, cartlist) {
            state.selectlist = [];
            state.list = cartlist;
            cartlist.forEach(v => {
                if (v.checked) {
                    state.selectlist.push(v.id);
                }
            })
        },
        //全选
        [CHECK_ALL](state) {
            state.selectlist = state.list.map(v => {
                v.checked = true;
                return v.id;
            })
        },
        //全不选
        [UN_CHECK_ALL](state) {
            state.list.forEach(v => {
                v.checked = false;
            })
            state.selectlist = [];
        },
        //单选
        [CHECK_ITEM](state, index) {
            console.log(index);
            let id = state.list[index].id;
            let i = state.selectlist.indexOf(id);
            if (i > -1) {
                state.selectlist.splice(i, 1);

            } else {
                state.selectlist.push(id);
            }
        },
    },
    actions: {
        checkallFn({ commit, getters }) {
            getters.isCheckAll ? commit('UN_CHECK_ALL') : commit('CHECK_ALL')
        },
        delGoodsFn({ state }, id) {
            //如果没有选中
            console.log(id);
            console.log(state.selectlist);
            if (state.selectlist.length == 0 && typeof id=='object') {
                Toast('请选择商品');
                return;
            }
            Dialog.confirm({
                message: '你确定要删除这些商品吗?',
            }).then(() => {
                //如果传入的id是number类型
                let idArr = [];
                if (typeof id == 'number') {
                    //单个删除
                    idArr = [id];
                } else {
                    idArr = state.selectlist;
                }
                console.log(idArr);
                request.$axios({
                    url: '/api/deleteCart',
                    method: 'POST',
                    data: {
                        id: idArr
                    }
                }).then(res => {
                    console.log(res);
                    idArr.forEach(v => {
                        state.list = state.list.filter((item) => {
                            return item.id != v;
                        })
                        console.log(state.list);
                    })
                    Toast(res.data.msg);
                })
            }).catch(() => {
                return;
            });

        }
    },
}