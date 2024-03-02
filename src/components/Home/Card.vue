<template>
    <div class="title">
        <slot>
            <span>爆款推荐</span>
        </slot>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.title {
    width: 100%;
    font-size: .4267rem;
    text-align: center;
    padding: .2667rem 0;

    span {
        position: relative;
    }

    span::after {
        content: "";
        display: block;
        position: absolute;
        right: -0.5rem;
        top: 50%;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #d4c0a7;
    }

    span::before {
        content: "";
        display: block;
        position: absolute;
        left: -0.5rem;
        top: 50%;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #d4c0a7;
    }
}
</style>