<template>
	<div class="content">
		<section class="hero">
			<div class="hero-body">
				<div class="title">Blog about everything and nothing</div>
			</div>
		</section>
		<section class="container">
			<div class="is-flex-wrap is-space-between">
				<article
					v-for="section in sections"
					:key="section.title"
					class="message is-dark blog-item is-flex-col"
				>
					<div class="message-header">{{ section.title }}</div>
					{{ section.subtitle }}
					<br>
					<router-link
						v-for="article in section.articles"
						:key="article.title"
						:to="`/blog/${article.to}`"
						class="button is-dark"
					>{{ article.title }}</router-link>
				</article>
			</div>
		</section>
		<router-view/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import wip from "@/components/wip.vue";

@Component({
	components: {
		wip
	}
})
export default class Home extends Vue {
	sections = [
		{
			title: "Reverse Engineering",
			subtitle:
				"Random articles about the art of reverse engineering, they require programming experience prior to reading.",
			articles: [{ to: "", title: "Coming soon" }]
		},
		{
			title: "Webdev",
			subtitle:
				"My adventures in webdev, how it sucks and how to make it suck less",
			articles: [{ to: "website", title: "Making of bonusplay.pl" }]
		},
		{
			title: "Networking in Video Games",
			subtitle: "My adventures in game dev.",
			articles: [
				{
					to: "multiplayer/0",
					title: "Basics of basics"
				},
				{
					to: "multiplayer/1",
					title: "Input parsing"
				}
			]
		}
	];
}
</script>

<style lang="less" scoped>
@import "../common.less";

.hero {
	margin-top: 10vh;
	margin-bottom: 2vh;
	background-color: #6b1b80;
}

.message.is-dark {
	background-color: transparent;

	@media @desktop {
		width: calc((100% - 2.5vw * 2) / 3);

		// margin between items except last
		&:not(:nth-child(3n)) {
			margin-right: 2.5vw;
		}
	}

	@media @tablet {
		margin: 0 2.5vw;
		width: calc((100% - 2.5vw - 5vw * 2) / 2);

		// margin between items except last
		&:not(:nth-child(2n)) {
			margin-right: 2.5vw;
		}
	}

	@media @mobile {
		margin: 0 5vw;
		width: 100%;
	}

	.button {
		margin: 1vw 1vw;
	}
}
</style>
