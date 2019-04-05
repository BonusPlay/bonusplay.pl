<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<router-link
				v-for="item in left"
				:key="item.name"
				:to="item.to"
				class="navbar-item"
			>{{ item.name }}</router-link>
			<div class="navbar-item has-dropdown is-hoverable">
				<a class="navbar-link">CV</a>
				<div class="navbar-dropdown">
					<a href="/cv_en" class="navbar-item">
						<img :src="require('@/assets/en.svg')" class="flag"/>
						English
					</a>
					<a href="/cv_pl" class="navbar-item">
						<img :src="require('@/assets/pl.svg')" class="flag"/>
						Polski
					</a>
				</div>
			</div>
		</div>
		<div class="navbar-menu">
			<div class="navbar-end">
				<a v-for="item in right" :key="item.name" :href="item.to" class="navbar-item">
					<b-icon :icon="item.icon"/>
					<span>{{ item.name }}</span>
				</a>
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

	.navbar-link {
		background-color: #6b1b80;
		color: whitesmoke;

		&:hover {
			background-color: #854497;
		}
	}

	.navbar-dropdown {
	 	background-color: #6b1b80;
	 	border-color: #854497;
	}

	.navbar-dropdown a.navbar-item:hover {
		color: whitesmoke;
	}

	.navbar-item.has-dropdown:hover .navbar-link, .navbar-item.has-dropdown.is-active .navbar-link {
		background-color: #6b1b80;
		border-color: #854497;
	}

	.navbar-item {
		color: whitesmoke;
		background-color: #6b1b80;

		&:hover {
			background-color: #854497;
		}
	}
}

.flag {
	width: 1vw;
	margin-right: 5px;
}
</style>
