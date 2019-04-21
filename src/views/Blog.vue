<template>
	<div class="content">
		<section class="hero">
			<div class="hero-body">
				<div class="title">Blog about everything and nothing</div>
			</div>
		</section>
		<section class="container">
			<!-- <wip/> -->
			<div class="columns container">
				<article v-for="section in sections" :key="section.title" class="message is-dark column is-4">
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
			title: "Other",
			subtitle: "Random articles that I didn't know where to put.",
			articles: [
				{
					to: "multiplayer",
					title:
						"Networking in video games - from intern to architect"
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
	background-color: #6b1b80;
}

.message.is-dark {
	background-color: transparent;
}
</style>
