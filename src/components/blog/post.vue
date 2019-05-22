<template>
	<v-container>
		<v-btn
			color="purple darken-2"
            small
            top
            left
            fab
			id="back"
			@click="$router.go(-1)"
        >
			<v-icon>fas fa-arrow-left</v-icon>
		</v-btn>
		<router-view class="blog-post"/>
	</v-container>
</template>

<style lang="less" scoped>
.blog-post {
	@media @desktop {
		margin: 0 5vw;
	}
}

#back {
	position: absolute;
}
</style>