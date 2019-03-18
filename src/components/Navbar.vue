<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<router-link
				v-for="item in left"
				:key="item.name"
				:to="item.to"
				class="navbar-item"
			>{{ item.name }}</router-link>
			<a href="/cv" class="navbar-item">CV</a>
		</div>
		<div class="navbar-menu">
			<div class="navbar-end">
				<router-link v-for="item in right" :key="item.name" :to="item.to" class="navbar-item">
					<b-icon :icon="item.icon"/>
					<span>{{ item.name }}</span>
				</router-link>
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
	left = [
		{ name: "Home", to: "/" },
		{ name: "Blog", to: "/blog" },
		{ name: "API", to: "/api" }
	];

	right = [
		{ name: "Github", to: "/github", icon: "github" },
		{ name: "Facebook", to: "/facebook", icon: "github" },
		{ name: "Discord", to: "/discord", icon: "discord" },
		{ name: "YouTube", to: "/youtube", icon: "youtube" }
	];
}
</script>

<style lang="less" scoped>
.navbar {
	background-color: #6b1b80;

	.navbar-item {
		color: whitesmoke;

		&:hover {
			background-color: #854497;
		}
	}
}
</style>
