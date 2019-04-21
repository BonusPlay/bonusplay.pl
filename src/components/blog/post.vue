<template>
	<section class="section">
		<div class="container has-text-left">
			<router-link to="/blog" class="button is-dark">Back</router-link>
			<router-view/>
		</div>
	</section>
</template>

<style lang="less" scoped>
.container {
	margin-top: 5vh;
}
</style>
