<template>
	<div class="has-text-justified content">
		<h1 class="title is-1 has-text-centered">Multiplayer</h1>In this blog post, I'm going to describe
		<div class="has-text-centered">
			<img :src="require('@/assets/blog/website00.webp')">
			<img :src="require('@/assets/power.jpg')">
		</div>
		<h1 class="title is-3 has-text-centered">Frontend</h1>Frontend is written in Vue. The reasony I prefer Vue over React is that it separates all 3
		<i>"layers"</i> of frontend.
		In React, you have JS and HTML mixed. In my opinion that approach only makes code harder to read.
		Libraries and technologies I've used:
		<ul>
			<li>Vuex - state storage (currently unused)</li>
			<li>Vue-router - navigation</li>
			<li>
				Bulma - CSS framework
				<br>I chose Bulma instead of Material Design/Bootstrap, because I wanted to experiment with new framework.
				I wanted a dark theme website, but I didn't want to use Sass CSS (why the hell does a CSS precompiler need C++ build chain???),
				so I had to write some CSS myself.
			</li>
			<li>
				TypeScript - why not
				<br>I've learned, that it's overkill for small project like this, but probably helps
				<b>a lot</b> when working in a team, due to interfaces and types being well known to both sides.
				Also,
				<code>vue-class-component</code> and
				<code>vue-property-decorator</code> are really cool.
			</li>
			<li>LessCSS - just CSS, with a little bit more umph.</li>
			<li>PWA - why not, since webpack + Vue allow to cache a lot of stuff "by default".</li>
		</ul>
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
export default class Multiplayer0 extends Vue {}
</script>