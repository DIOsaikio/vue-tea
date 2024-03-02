<template>
    <div class='path-index container'>
        <Header></Header>
        <section>
            <ul v-if="addressList.length">
                <li v-for="(item, index) in addressList" :key="index" @click="addAddress(item)">
                    <div>
                        <span>{{ item.name }}</span>
                        <span>{{ item.tel }}</span>
                    </div>
                    <div>
                        <span class='active' v-if="item.isDefault == 1">[默认]</span>
                        <span>{{ item.province }}{{ item.city }} {{ item.county }}</span>
                        <span>{{ item.addressDetail }}</span>
                    </div>
                </li>
            </ul>
            <h2 v-else>暂无收货地址,请添加</h2>
            <div class='add-path' @click="addAddress('add')">添加地址</div>
        </section>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import Header from '@/components/Address/Header'
import Tabbar from '@/components/common/Tabbar.vue'
import request from '@/components/common/api/request'
import bus from '@/bus'
import { mapState, mapMutations } from "vuex"
export default {
    data() {
        return {
            addressStatus:false,//是否是结算页面进来的
        }
    },
    components: { Header, Tabbar },
    computed: {
        ...mapState({
            addressList: state => state.address.addressList,
        })
    },
    created() {
        //从订单页面跳转过来的
        if(this.$route.query.type=='select'){
           this.addressStatus=true;
        }
        this.getData();
    },
    methods: {
        ...mapMutations(['INIT_ADDRESS']),
        getData() {
            request.$axios(
                {
                    url: '/api/getAddress',
                    method: 'POST',
                    headers: {
                        token: true,
                    },
                }
            ).then(res => {
                this.INIT_ADDRESS(res.data.data);
            })
        },
        addAddress(option) {
            //从订单页面进入的
            if(this.addressStatus){
                bus.$emit('selectAddress',JSON.stringify(option))
                this.$router.back();
                return;
            }
            this.$router.push({
                name: 'Addresslist',
                params:{
                    key:JSON.stringify(option)
                }
            })
        },
       
    }
}
</script>

<style scoped lang="scss">
section {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #F7F7F7;

    ul {
        width: 100%;

        li {
            padding: 0.266666rem 0.4rem;
            margin: 0.16rem 0;
            background-color: #FFFFFF;

            span {
                padding-right: 0.4rem;
                font-size: 0.426666rem;
            }

            .active {
                color: #b0352f;
            }
        }
    }

    .add-path {
        margin-top: 0.8rem;
        width: 3.2rem;
        line-height: 1.066666rem;
        font-size: 0.48rem;
        text-align: center;
        color: #FFFFFF;
        background-color: #b0352f;
        border-radius: 6px;
    }
}

::v-deep .tabbar {
    border-top: 2px solid #ccc;
}
</style>