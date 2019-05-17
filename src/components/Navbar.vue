<template>
	<nav class="navbar" role="navigation" aria-label="main navigation">
		<div class="navbar-brand">
			<div @click="nav('/')" class="navbar-item">
				<b-icon icon="home" pack="fas">Home</b-icon>
			</div>
			<a
				@click="expand = !expand"
				v-bind:class="{ 'is-active': expand }"
				role="button"
				class="navbar-burger burger"
				aria-label="menu"
				aria-expanded="false"
			>
				<span aria-hidden="true"/>
				<span aria-hidden="true"/>
				<span aria-hidden="true"/>
			</a>
		</div>
		<div v-bind:class="{ 'is-active': expand }" class="navbar-menu">
			<div class="navbar-start">
				<div
					v-for="item in left"
					:key="item.name"
					@click="nav(item.to)"
					class="navbar-item"
				>{{ item.name }}</div>
				<div class="navbar-item has-dropdown is-hoverable">
					<a class="navbar-link">CV</a>
					<div class="navbar-dropdown">
						<a href="/cv_en" class="navbar-item">
							<img :src="require('@/assets/en.svg')" class="flag">
							English
						</a>
						<a href="/cv_pl" class="navbar-item">
							<img :src="require('@/assets/pl.svg')" class="flag">
							Polski
						</a>
					</div>
				</div>
			</div>
			<div class="navbar-end">
				<a v-for="item in right" :key="item.name" :href="item.to" class="navbar-item">
					<b-icon :icon="item.icon" :pack="item.pack" />
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
	expand = false;

	left = [{ name: "Blog", to: "/blog" }, { name: "API", to: "/api" }];

	right = [
		{ name: "Github", to: "/github", icon: "github", pack: "fab" },
		{ name: "Email", to: "mailto:root@bonusplay.pl", icon: "envelope", pack: "fas" },
		{ name: "Facebook", to: "/facebook", icon: "facebook", pack: "fab" },
		{ name: "Discord", to: "/discord", icon: "discord", pack: "fab" },
		{ name: "YouTube", to: "/youtube", icon: "youtube", pack: "fab" }
	];

	nav(path: string) {
		this.expand = false;
		this.$router.push(path);
	}
}
</script>

<style lang="less" scoped>
.navbar {
	background-color: @primary;

	.navbar-link {
		background-color: @primary;
		color: @text;

		&:hover {
			background-color: @secondary;
		}
	}

	.navbar-dropdown {
		background-color: @primary;
		border-color: @secondary;
	}

	.navbar-dropdown a.navbar-item:hover {
		color: @text;
	}

	.navbar-item.has-dropdown:hover .navbar-link,
	.navbar-item.has-dropdown.is-active .navbar-link {
		background-color: @primary;
		border-color: @secondary;
	}

	.navbar-item {
		color: @text;
		background-color: @primary;
		cursor: pointer;

		&:hover {
			background-color: @secondary;
		}
	}

	.navbar-menu {
		text-align: start;
		background-color: @secondary;

		@media @desktop {
			background-color: @primary;
		}
		
		.navbar-end {
			.icon {
				margin-right: 5px;
			}
		}
	}

	.navbar-burger {
		color: @text;
	}
}

.flag {
	width: 1vw;
	margin-right: 5px;
}
</style>
