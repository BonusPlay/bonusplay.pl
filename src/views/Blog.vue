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

@Component
export default class Home extends Vue {
	sections = [
		{
			title: "Random projects",
			subtitle: "Random, unrelated articles about (un)finished projects from wide range of topics.",
			articles: [
				{
					to: "reverse-engineering/counter-bonus",
					title: "Counter-Bonus the CS:GO cheat"
				},
				{
					to: "networking/hsmod",
					title: "Networking layer in HSMod"
				},
				{
					to: "web/website",
					title: "Making of bonusplay.pl"
				}
			]
		},
		{
			title: "Reverse Engineering",
			subtitle: "A series of articles about the art of reverse engineering with the goal of teaching the very first steps. They require programming experience prior to reading.",
			articles: [
				{
					to: "",
					title: "coming soon!"
				}
			]
		},
		{
			title: "Webdev",
			subtitle: "My adventures in webdev, how it sucks and how to make it suck less.",
			articles: [
				{
					to: "",
					title: "coming soon!"
				}
			]
		},
		{
			title: "Networking in Video Games",
			subtitle: `This is a series of guides, that will teach you quite a lot about networking in video games.
			If you are an expert in this topic, these guides won't be of any use to you, but otherwise they should make a pretty good base to start off from.`,
			articles: [
				{
					to: "",
					title: "coming soon!"
				}
			]
		}
	];
}
</script>

<style lang="less" scoped>
.hero {
	margin-top: 10vh;
	margin-bottom: 2vh;
	background-color: @primary;
}

.message.is-dark {
	background-color: transparent;
	border: 1px solid @bg-1;

	@media @desktop {
		width: calc((100% - 2.5vw * 2) / 3);

		// margin between items except last
		&:not(:nth-child(3n)) {
			margin-right: 2.5vw;
		}
	}

	@media @tablet {
		margin: 0.5vh 2.5vw;
		width: calc((100% - 2.5vw - 5vw * 2) / 2);

		// margin between items except last
		&:not(:nth-child(2n)) {
			margin-right: 2.5vw;
		}
	}

	@media @mobile {
		margin: 0.5vh 5vw;
		width: 100%;
	}

	.button {
		margin: 0.5vh 1vw;
	}
}
</style>
