<template>
	<div id="content">
		<section class="section">
			<div class="columns container is-fluid">
				<div class="column is-8">
					<h1 class="title is-1">About me</h1>
				</div>
				<div class="column is-3">
					<figure class="image is-3by4">
						<img :src="require('@/assets/mecrop.webp')">
					</figure>
				</div>
			</div>
		</section>
		<section class="section">
			<p class="title is-1 section-title">My projects</p>
			<div class="columns container is-fluid">
				<div class="column is-4 first">Project #1</div>
				<div class="column is-4 second">Project #2</div>
				<div class="column is-4 third">Project #3</div>
			</div>
		</section>
		<section class="section">
			<p class="title is-1 section-title">Games I play</p>
			<div class="container is-fluid">
				<img v-for="item in games" :key="item" :src="require(`@/assets/icons-games/${item}.webp`)">
			</div>
		</section>
		<section class="section">
			<p class="title is-1 section-title">Technologies I use</p>
			<div v-for="index in Math.floor(tech.length / 6)" :key="index" class="container is-fluid">
				<p v-for="item in tech.slice(index * 6, index * 6 + 6)" :key="item">
					index: {{index}}, item: {{item}}
				</p>
			</div>

			<div v-for="index in Math.floor(tech.length / 6)" :key="index" class="container is-fluid">
				<img v-for="item in tech.slice(index * 6, index * 6 + 6)" :key="item" :src="require(`@/assets/icons-tech/${item}.webp`)"/>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";

@Component({
	components: {
		HelloWorld
	}
})
export default class Home extends Vue {
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
		"jquery",
		"kotlin",
		"mysql",
		"nodejs",
		"opencv",
		"python",
		"sass",
		"spring",
		"ue",
		"unity"
	];
}
</script>

<style lang="less" scoped>
// don't clip top of first section
section:first-child {
	clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 10vh));
	margin-top: 0;
}

// don't clip bottom of last section
section:last-child {
	clip-path: polygon(0 0, 100% 10vh, 100% 100%, 0 100%);
	padding-bottom: 3rem;
}

section:nth-child(odd) {
	background: #1e1e1e;
}

section {
	clip-path: polygon(0 0, 100% 10vh, 100% 100%, 0 calc(100% - 10vh));
	margin-top: calc(-10vh - 1px);
	padding-bottom: 10vh;

	> * {
		padding-top: 3vh;
	}

	> p:first-of-type(p) {
		padding-right: 40%;
	}
}

// TODO: Fix on mobile
.first {
	margin-bottom: 5vh;
}

.second {
	margin-top: 2.5vh;
	margin-bottom: 2.5vh;
}

.third {
	margin-top: 5vh;
}
</style>
