 
<template>
	<v-container>
		<router-view class="blog-post" />
	</v-container>
</template>

<style lang="less" scoped>
.blog-post {
	@media only screen and (min-width: 1088px) {
		margin: 0 5vw;
	}
}
</style>