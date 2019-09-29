<template>
	<v-container>
		<v-row>
			<v-col v-for="section in sections" :key="section.title" col="12" md="4" pa-1>
				<v-card height="100%" class="card">
					<v-card-title primary-title>
						<h3 class="headline">{{ section.title }}</h3>
					</v-card-title>

					<v-card-text class="grow">
						<span class="text-xs-justify">{{ section.description }}</span>
					</v-card-text>

					<v-btn :to="`/blog/${article.to}`" v-for="article in section.articles" :key="article.title" class="mt-1">
						<span>{{article.title}}</span>
					</v-btn>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
class Article {
	/**
	 * @param {String} to
	 * @param {String} title
	 */
	constructor(to, title) {
		this.to = to;
		this.title = title;
	}
}

class Section {
	/**
	 * @param {String} title
	 * @param {String} description
	 * @param {[Article]} articles
	 */
	constructor(title, description, articles) {
		this.title = title;
		this.description = description;
		this.articles = articles;
	}
}

export default {
	name: "Blog",
	data: () => ({
		sections: [
			new Section(
				"Random projects",
				"Random, unrelated articles about (un)finished projects from wide range of topics.",
				[
					new Article("reverse-engineering/counter-bonus", "Counter-Bonus the CS:GO cheat"),
					new Article("networking/hsmod", "Networking layer in HSMod")
				]
			),
			new Section(
				"Networking in Video Games",
				`This is a series of guides, that will teach you quite a lot about networking in video games. If you are an expert in this topic, these guides won't be of any use to you, but otherwise they should make a pretty good base to start off from.`,
				[
					new Article("", "coming soon!")
				]
			),
			new Section(
				"Reverse Engineering",
				"A series of articles about the art of reverse engineering with the goal of teaching the very first steps. They require programming experience prior to reading.",
				[
					new Article("", "coming soon!")
				]
			),
			new Section(
				"Webdev",
				"My adventures in webdev, how it sucks and how to make it suck less.",
				[
					new Article("web/website", "Making of bonusplay.pl")
				]
			),
			new Section(
				"Swiss army knife",
				"Everything that I wanted to write about, but didn't fit into other categories",
				[
					new Article("random/git-deploy", "Git-Deploy"),
					new Article("random/mail-server", "Mail server with postfix + dovecot/cyrus"),
					new Article("random/linux-gaming", "Gaming on Linux")
				]
			)
		]
	})
};
</script>

<style lang="less" scoped>
.card {
	display: flex;
	flex-direction: column;
}
</style>