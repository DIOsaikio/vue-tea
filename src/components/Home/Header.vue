<template>
  <header>
    <h1>
        <img src="@/assets/images/logo.png" alt="">
    </h1>
    <div class="search" @click="goSearchView" >
        <i class="iconfont icon-sousuo"></i>
        <div>挑您喜欢的...</div>
    </div>
    <div class="kefu">
        <i class="iconfont icon-kefu"></i>
    </div>
  </header>
 
</template>

<script>
export default {
   methods: {
    goSearchView(){
        this.$router.push('/search')
    }
   },
}
</script>
<style scoped lang="scss" >
  header{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 1.1733rem;
    background-color:#a62e29;
  h1{
    width: 2.2667rem;
    height: 1.1733rem;
    img{
        width: 100%;
        height: 100%;
    }
  }
  .search{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 6.56rem;
    height: .8rem;
    background-color: #fff;
    border-radius: .5333rem;
    div{
        flex: 1;
        font-size:.32rem;
        border-top-right-radius: .32rem;
        border-bottom-right-radius: .32rem;
    }
    i{
        font-size:.5333rem;
        color: #ccc;
    }
  }
  .kefu{
    i{
        font-size:.64rem;
        color: #fff;
    }
  }
  }
</style>