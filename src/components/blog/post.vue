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
		<router-view class="px-2"/>
	</v-container>
</template>

<style lang="less" scoped>
.blog-post {
	margin-top: 5vh;
	margin-bottom: 5vh;

	@media @mobile {
		max-width: calc(100vw - 10px);
		padding-left: 5px;
		padding-right: 5px;
	}
}

#back {
	position: absolute;
}
</style>