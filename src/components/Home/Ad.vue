<template>
	<div class='ad'>
		<ul>
			<li v-for="(item, index) in AdList" :key="index">
				<img :src='item.imgUrl' />
			</li>
		</ul>
	</div>
</template>

<script>
export default{
	props:{
        AdList:{},
    }
}
</script>

<style scoped>
.ad{
	width: 100%;
	/* height: 2.986666rem; */
}
.ad img{
	width: 100%;
	height:100%;
}
</style>
