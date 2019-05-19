<template>
	<v-container px-2>
		<v-layout wrap align-center fill-height tag="section">
			<v-flex xs12 md8 text-xs-justify>
				<h2 class="display-2">About me</h2>
				<p>
					My name is Adam Kliś, I'm currently {{getAge(new Date(1999, 1, 7))}}.
					I've been gaming since I was 6 and coding for over 7 years now.
					What's different about me, is that I learn by practice, trial-and-error.
					That allows me to understand the code 'my way'.
					I've started with Java, followed by C++, C, Android, C# and later webdev in order.
				</p>
				<p>
					People tell me, that I know way too many languages and that I'm probably a
					<i>'jack of all trades master of none'</i>.
					However, think of my programming skills as a toolbox full of fun things.
					As you learn more and more languages you begin to see not only similarities between them but differences as well.
					Some of them want to kill you
					<i>
						<b>*cough*</b>C++
						<b>*cough*</b>
					</i>
					, some of them offer great packaging systems.
					Another has an almost infinite amount of libraries.
					You begin to see differences between them and choose the right tool for the right job.
					Why learn how to use only one tool?
					Do we really have to use the favorite screwdriver, when a nailgun would solve the problem 10x faster?
				</p>
				<p>In my free time, I like to play guitar, collect old coins and play computer games with my friends.</p>
			</v-flex>
			<v-flex xs12 md4 :class="{'pl-3': $vuetify.breakpoint.mdAndUp}" contain>
				<v-img contain :src="require('@/assets/mecrop.webp')" max-height="30vh"/>
			</v-flex>
		</v-layout>
		<v-layout wrap tag="section">
			<h2 class="display-2">My projects</h2>

			<v-container>
				<v-layout row wrap fill-height align-start justify-space-around>
					<v-flex
						v-for="project in projects"
						:key="project.title"
						xs12
						md4
						:class="{'py-1': $vuetify.breakpoint.smAndDown, 'px-1': $vuetify.breakpoint.mdAndUp}"
					>
					<!-- TODO: have links on same height -->
						<v-card>
							<v-card-title primary-title>
								<h3 class="headline mb-0">{{ project.title }}</h3>
								<span class="text-xs-justify">{{ project.description }}</span>
							</v-card-title>
							<v-card-actions>
								<v-spacer class="hidden-md-and-up"/>
								<v-container fluid pa-0>
									<v-layout row wrap fill-height align-center justify-space-around>
										<v-flex v-for="link in project.links" :key="link.to">
											<!-- ugly hack to distinguish between outside link and inside link
												 could be done using another field -->
											<v-btn v-if="link.to[0] === '/'" :to="link.to" round>
												<v-icon left>{{ link.pack }} fa-{{ link.icon }}</v-icon>
												{{ link.name }}
											</v-btn>
											<v-btn v-else :href="link.to" round>
												<v-icon left>{{ link.pack }} fa-{{ link.icon }}</v-icon>
												<span>{{ link.name }}</span>
											</v-btn>
										</v-flex>
									</v-layout>
								</v-container>
							</v-card-actions>
						</v-card>
					</v-flex>
				</v-layout>
			</v-container>
		</v-layout>
		<v-layout wrap tag="section">
			<h2 class="display-2">Games I play</h2>
			<v-container>
				<v-layout row wrap fill-height align-center justify-space-around>
					<v-flex v-for="game in games" :key="game" xs2>
						<v-img :src="require(`@/assets/icons-games/${game}.webp`)"/>
					</v-flex>
				</v-layout>
			</v-container>
		</v-layout>
		<v-layout wrap tag="section">
			<h2 class="display-2">Technologies I use</h2>
			<v-container>
				<v-layout row wrap>
					<v-flex v-for="item in tech" :key="item" xs2 pa-2 d-flex justify-center align-center>
						<v-img :src="require(`@/assets/icons-tech/${item}.svg`)"/>
					</v-flex>
				</v-layout>
			</v-container>
		</v-layout>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
	projects = [
		{
			title: "HSMod",
			description: `Hearthstone clone made in Unity3D. Fan made project to implement new game mechanics,
			cards and heroes to the game we all loved. Due to legal reasons we had to make it closed source and take down the website. Maybe in the future it will come back?`,
			links: [
				{
					to: "https://www.youtube.com/watch?v=0e4Du3KekDo",
					name: "YouTube",
					icon: "youtube",
					pack: "fab"
				},
				{
					to:
						"https://www.polygon.com/2017/4/13/15292266/hearthstone-new-class-classes-death-knight-demon-hunter-monk-arthas-hsmod-fan-game",
					name: "Article",
					icon: "link",
					pack: "fas"
				},
				{
					to: "/blog/networking/hsmod",
					name: "Blog",
					icon: "link",
					pack: "fas"
				}
			]
		},
		{
			title: "BonusPlay.pl",
			description:
				"This overcomplicated for no reason, SPA+PWA website and it's, over the top high performance backend architecture.",
			links: [
				{
					to: "https://github.com/BonusPlay/BonusPlay.pl-frontend",
					name: "frontend",
					icon: "github",
					pack: "fab"
				},
				{
					to: "https://github.com/BonusPlay/BonusPlay.pl-backend",
					name: "backend",
					icon: "github",
					pack: "fab"
				},
				{
					to: "/blog/web/website",
					name: "Blog",
					icon: "link",
					pack: "fas"
				}
			]
		},
		{
			title: "CounterBonus",
			description:
				"A CS:GO cheat written along my adventures when I learned (or at the very least attempted) how to reverse engineer x86 assembly.",
			links: [
				{
					to: "https://github.com/BonusPlay/CounterBonus",
					name: "Source",
					icon: "github",
					pack: "fab"
				},
				{
					to: "/blog/reverse-engineering/counter-bonus",
					name: "article",
					icon: "link",
					pack: "fas"
				}
			]
		}
	];

	games = ["csgo", "dota2", "lol", "r6s", "sc2"];

	tech = [
		"3dmax",
		"android",
		"assembly",
		"bootstrap",
		"c",
		"cpp",
		"csharp",
		"git",
		"go",
		"hibernate",
		"html5",
		"java",
		"kotlin",
		"latex",
		//"mysql",
		"mariadb",
		"nodejs",
		//"opencv",
		"python",
		"redis",
		//"sass",
		"spring",
		"traefik",
		"trello",
		"unity"
	];

	getAge(first: Date): number {
		let diff = (first.getTime() - new Date().getTime()) / 1000;
		diff /= 60 * 60 * 24;
		return Math.abs(Math.round(diff / 365.25));
	}
}
</script>