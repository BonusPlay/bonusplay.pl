<template>
	<section class="section">
		<div class="container has-text-left">
			<button @click="$router.go(-1)" class="button is-dark">
				<b-icon icon="arrow-left"/>Back
			</button>
			<router-view/>
		</div>
	</section>
</template>

<style lang="less" scoped>
.container {
	margin-top: 5vh;
}

.button .icon:first-child:last-child {
	margin-right: 0;
}
</style>