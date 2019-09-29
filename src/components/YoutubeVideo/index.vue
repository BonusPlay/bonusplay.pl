<template>
	<div class="video-wrapper">
		<iframe
			id="video"
			:src="url"
			frameborder="0"
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
			allowfullscreen
		/>
	</div>
</template>

<script>
export default {
	name: "YoutubeVideo",
	props: {
		url: String
	}
}
</script>

<style lang="less" scoped>
.video-wrapper {
	position: relative;
	width: 80%;
	height: 0;
	padding-bottom: 56.25%;
	margin-left: 10%;
}

#video {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
</style>