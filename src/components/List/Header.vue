<template>
    <header>
        <div class="left">
            <i class="iconfont icon-fanhui"></i>
        </div>
        <div class="middle">
            <form action="" onsubmit="return false">
                <i class="iconfont icon-sousuo"></i>
                <input v-model="searchVal" type="text" placeholder="搜索您喜欢的商品...">
            </form>

        </div>
        <div class="shouye">
            <i class="iconfont icon-shouye"></i>
        </div>
    </header>
</template>

<script>
export default {
    data() {
        return {
            searchVal: this.$route.query.keyword || '',
            searchArr: [],
        }
    },
    created() {

    },
    methods: {
        /* goBack() {
            this.$router.back();
        }, */
        /*  goSearch() {
             if (!this.searchVal) {
                 return;
             }
             //判断有没有缓存
             if (!localStorage.getItem('searchList')) {
                 localStorage.setItem('searchList', '[]')
             } else {
                 this.searchArr = JSON.parse(localStorage.getItem('searchList'));
             }
             this.searchArr.unshift(this.searchVal);
             let newArr = new Set(this.searchArr);
             localStorage.setItem('searchList', JSON.stringify(Array.from(newArr)))
             if(this.searchVal===this.$route.query.keyword){
                 return;
             }
             this.$router.push({
                 name: 'list',
                 query:{
                     keyword:this.searchVal
                 }
             });
         }, */
    },
}
</script>

<style scoped lang="scss">
header {
    font-size:.32rem;
    width: 100%;
    height: 1.1733rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #fff;
    background-color: #a62e29;

    .left {
        margin-bottom: .0533rem;

        i {
            font-size: .5333rem;

        }
    }

    .middle {
        width: 7.6533rem;
        height: .8rem;
        background-color: #fff;
        border-radius: 1.32rem;
        text-align: center;

        form {
            display: flex;
            align-items: center;

            i {
                padding-left: .2667rem;
                color: #ccc;
            }

            input {
                width: 80%;
                line-height: .8rem;
                height: .8rem;
            }
        }

    }

    .right {
        font-size: .3733rem;
    }
    .shouye{
        padding-right: .1333rem;
    i{
        font-size:.64rem;
        color: #fff;
    }
  }
}
</style>