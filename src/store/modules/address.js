import { INIT_ADDRESS } from "./mutations-types"
export default {
    state: {
        addressList: [],
    },
    getters: {
        defaultAddress(state) {
            return state.addressList.filter(v => {
                return v.isDefault == 1
            })
        }
    },
    mutations: {
        [INIT_ADDRESS](state, addreslist) {
            state.addressList = addreslist
        }
    },
    actions: {},
}