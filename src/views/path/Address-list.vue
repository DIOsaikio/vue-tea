<template>
    <div class='path-index container'>
        <Header>
            <span v-if="isAdd">添加地址</span>
            <span v-else="isAdd">编辑地址</span>
        </Header>
        <section>
            <van-address-edit :area-list="areaList" show-set-default show-search-result :search-result="searchResult"
                @save="onSave" v-if="isAdd" />
            <van-address-edit v-else :address-info='AddressInfo' :area-list="areaList" show-delete show-set-default
                show-search-result @save="onUpdate" @delete="onDelete" />
        </section>
        <Tabbar></Tabbar>
    </div>
</template>

<script>
import { Toast } from 'vant';
import Header from '@/components/Address/Header'
import Tabbar from '@/components/common/Tabbar.vue'
import request from '@/components/common/api/request'
export default {
    data() {
        return {
            isAdd: false,
            AddressInfo: {},
            areaList: {
                province_list: {
                    110000: '北京市',
                    120000: '天津市',
                },
                city_list: {
                    110100: '北京市',
                    120100: '天津市',
                },
                county_list: {
                    110101: '东城区',
                    110102: '西城区',
                    120101: '塘沽区',
                },
            },
            searchResult: [],
        };
    },
    created() {
        let key = JSON.parse(this.$route.params.key);
        console.log(key);
        if (key == 'add') {
            //添加地址
            this.isAdd = true;
        } else {
            key.isDefault = key.isDefault == 1 ? true : false
            //编辑地址
            this.AddressInfo = key;
        }
    },
    components: {
        Header,
        Tabbar
    },
    methods: {
        onSave(content) {
            console.log(content);
            content.isDefault = content.isDefault == true ? 1 : 0
            request.$axios(
                {
                    url: '/api/addAddress',
                    method: 'POST',
                    headers: {
                        token: true,
                    },
                    data: {
                        ...content,
                    },
                }
            ).then(res => {
                Toast(res.data.msg);
                this.$router.push('/address')
            })
        },
        onDelete(content) {
           request.$axios(
            {
                url:'/api/deleteAddress',
                method:'POST',
                headers:{
                    token:true,
                },
                data:{
                    ...content,
                }
            }
           ).then(res=>{
            Toast(res.data.msg);
            this.$router.back();
           })
        },
        onUpdate(content) {
            console.log(content);
            request.$axios(
                {
                    url:'/api/updateAddress',
                    method:'POST',
                    data:{
                        ...content,
                    },
                    headers:{
                        token:true,
                    }
                }
            ).then(res=>{
                Toast(res.data.msg);
                this.$router.back();
            })
         }
    },
}
</script>

<style lang='scss' scoped>
section {
    background-color: #F7F7F7;

    .van-address-edit {
        padding: 0;
    }

    ::v-deep .van-address-edit__buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    ::v-deep .van-button--danger {
        width: 8rem;
        height: 1.066666rem;
        background-color: #b0352f;
    }

    ::v-deep .van-button--default {
        width: 8rem;
        height: 1.066666rem;
    }
}

::v-deep .tabbar {
    border-top: 2px solid #ccc;
}
</style>
