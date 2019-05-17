<template>
	<section class="section">
		<div class="container has-text-left blog-post">
			<button @click="$router.go(-1)" class="button is-dark">
				<b-icon icon="arrow-left" pack="fas"/>Back
			</button>
			<router-view/>
		</div>
	</section>
</template>

<style lang="less">
.blog-post {
	h4.title.is-4 {
		margin-top: 1.5rem;
	}

	.notification {
		background: transparent;
		border: 1px solid @bg-1;
		max-width: 100vw;

		@media @mobile {
			padding: 1rem 0;
		}
	}

	// cap prismjs, so it doesn't overflow on mobile
	.code-toolbar {
		max-width: 100vw;
	}
}
</style>

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

.button .icon:first-child:last-child {
	margin-right: 0;
}
</style>