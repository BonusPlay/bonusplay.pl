<template>
	<v-container>
		<v-layout row wrap>
			<v-flex v-for="section in sections" :key="section.title" xs12 sm6 md4 pa-1>
				<v-card height="100%" class="flex-col">
					<v-card-title primary-title>
						<h3 class="headline mb-0">{{ section.title }}</h3>
						<span class="text-xs-justify">{{ section.subtitle }}</span>
					</v-card-title>

					<v-container pa-0 class="links">
						<v-layout align-space-around justify-space-between column fill-height>
							<v-flex v-for="article in section.articles" :key="article.title" xs12>
								<v-btn :to="`/blog/${article.to}`" block>
									<span class="text-wrap">{{article.title}}</span>
								</v-btn>
							</v-flex>
						</v-layout>
					</v-container>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	name: "Blog",
	data: () => ({
		sections: [
			{
				title: "Random projects",
				subtitle:
					"Random, unrelated articles about (un)finished projects from wide range of topics.",
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
				title: "Networking in Video Games",
				subtitle: `This is a series of guides, that will teach you quite a lot about networking in video games.
			If you are an expert in this topic, these guides won't be of any use to you, but otherwise they should make a pretty good base to start off from.`,
				articles: [
					{
						to: "",
						title: "coming soon!"
					}
				]
			},
			{
				title: "Reverse Engineering",
				subtitle:
					"A series of articles about the art of reverse engineering with the goal of teaching the very first steps. They require programming experience prior to reading.",
				articles: [
					{
						to: "",
						title: "coming soon!"
					}
				]
			},
			{
				title: "Webdev",
				subtitle:
					"My adventures in webdev, how it sucks and how to make it suck less.",
				articles: [
					{
						to: "",
						title: "coming soon!"
					}
				]
			},
			{
				title: "Random",
				subtitle:
					"Everything that I wanted to write about, but didn't fit into other categories",
				articles: [
					{
						to: "random/git-deploy",
						title: "Git-Deploy"
					},
					{
						to: "random/mail-server",
						title: "Mail server with postfix + dovecot/cyrus"
					},
					{
						to: "random/linux-gaming",
						title: "Gaming on Linux"
					}
				]
			}
		]
	})
};
</script>

<style lang="less" scoped>
// fixes button size with wrapped text
.v-btn {
	height: auto;
	padding: 5px 16px;
	min-height: 36px;
}

.links {
	margin-top: auto;
}
</style>