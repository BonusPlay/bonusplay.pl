<template>
	<div id="content">
		<section class="section">
			<div class="columns container is-fluid">
				<div class="column is-8">
					<h1 class="title is-1">About me</h1>
					<span class="has-text-justified">
						<p>
							My name is Adam Kliś, I'm currently {{getAge(new Date(1999, 1, 7))}}. I've been gaming since I was {{getAge(new Date())}} and coding for 5 years now.
							What's different about me, is that I learn by practice, trial-and-error.
							That allows me to understand the code 'my way'.
							I've started with Java, followed by C++, C, Android, C# and later webdev in order.
						</p>
						<br>
						<p>
							People tell me, that I know way too many languages and that I'm probably a
							<i>'jack of all trades master of none'</i>.
							However, think of my programming skills as a toolbox full of fun things.
							As you learn more and more languages you begin to see not only similarities between them but differences as well.
							Some of them want to kill you
							<i>
								<b>*cough*</b>C++
								<b>*cough*</b>
							</i>, some of them offer great packaging systems.
							Another has an almost infinite amount of libraries.
							You begin to see differences between them and choose the right tool for the right job.
							Why learn how to use only one tool?
							Do we really have to use the favorite screwdriver, when a nailgun would solve the problem 10x faster?
						</p>
						<br>
						<p>In my free time, I like to play guitar, collect old coins and play computer games with my friends.</p>
					</span>
				</div>
				<div class="column is-3 is-center">
					<figure class="image">
						<img :src="require('@/assets/mecrop.webp')" id="me">
					</figure>
				</div>
			</div>
		</section>
		<section class="section">
			<p class="title is-1 section-title">My projects</p>
			<div class="columns container is-fluid">
				<div :key="item.title" class="column is-4 has-text-justified" v-for="item in projects">
					<h1 class="title is-2 has-text-centered">{{ item.title }}</h1>
					<p>{{ item.description }}</p>
					<div class="links">
						<div v-for="link in item.links" :key="link.to">
							<router-link v-if="link.to[0] === '/'" :to="link.to" class="button is-dark is-spaced">
								<b-icon :icon="link.icon"/>
								<span>{{ link.name }}</span>
							</router-link>
							<a v-else :href="link.to" class="button is-dark is-spaced">
								<b-icon :icon="link.icon"/>
								<span>{{ link.name }}</span>
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="section">
			<p class="title is-1 section-title">Games I play</p>
			<div class="container is-center is-flex-row">
				<img
					:key="item"
					:src="require(`@/assets/icons-games/${item}.webp`)"
					class="is-icon is-spaced"
					v-for="item in games"
				>
			</div>
		</section>
		<section class="section">
			<p class="title is-1 section-title">Technologies I use</p>
			<div class="container is-center is-flex-wrap">
				<img
					:key="item"
					:src="require(`@/assets/icons-tech/${item}.svg`)"
					class="is-icon is-spaced"
					v-for="item in tech"
				>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
	projects = [
		{
			title: "HSMod",
			description:
				"Hearthstone clone made in Unity3D. Fan made project to implement new game mechanics, cards and heroes to the game we all loved. Due to legal reasons we had to make it closed source and take down the website. Maybe in the future it will come back?",
			links: [
				{
					to: "https://www.youtube.com/watch?v=0e4Du3KekDo",
					name: "YouTube",
					icon: "youtube"
				},
				{
					to:
						"https://www.polygon.com/2017/4/13/15292266/hearthstone-new-class-classes-death-knight-demon-hunter-monk-arthas-hsmod-fan-game",
					name: "Article",
					icon: "link"
				},
				{
					to: "/blog/hsmod",
					name: "Blog",
					icon: "link"
				}
			]
		},
		{
			title: "bonusplay.pl",
			description:
				"This website and it's overcomplicated, over the top backend architecture.",
			links: [
				{
					to: "https://github.com/BonusPlay/bonusplay.pl",
					name: "Source",
					icon: "github"
				},
				{
					to: "/blog/website",
					name: "Blog",
					icon: "link"
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
					icon: "github"
				},
				{
					to: "/blog/re/counter-bonus",
					name: "article",
					icon: "link"
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

<style lang="less" scoped>
@import "../common.less";

#me {
	max-width: 50vw;
}

section {
	clip-path: polygon(0 0, 100% 10vh, 100% 100%, 0 calc(100% - 10vh));
	margin-top: calc(-10vh - 1px);
	padding-bottom: 10vh;

	// don't clip top of first section
	&:first-child {
		clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 10vh));
		margin-top: 0;
	}

	// don't clip bottom of last section
	&:last-child {
		clip-path: polygon(0 0, 100% 10vh, 100% 100%, 0 100%);
		padding-bottom: 3rem;
	}

	// color every other section
	&:nth-child(odd) {
		background: #1e1e1e;
	}

	> .title {
		padding: 5vh 0 0 0;

		@media (min-width: 1023px) {
			padding: 3vh 35% 3vh 0;
		}
	}
}

.links {
	padding-top: 2vh;
	display: flex;
	justify-content: flex-end;
}

.is-spaced {
	margin: 1vw 1vw;
}

.is-icon {
	width: 15vw;
	max-height: 15vw;
}
</style>
