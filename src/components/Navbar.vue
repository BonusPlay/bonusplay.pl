<template>
	<div>
		<!-- Desktop -->
		<v-toolbar app class="hidden-sm-and-down">
			<v-toolbar-items>
				<v-btn to="/">
					<v-icon>fas fa-home</v-icon>
				</v-btn>
				<v-btn v-for="item in left" :key="item.name" :to="item.to">{{ item.name }}</v-btn>
			</v-toolbar-items>
			<v-spacer/>
			<v-toolbar-items>
				<v-btn v-for="item in right" :key="item.name" :href="item.to">
					<v-icon left>{{ item.pack }} fa-{{ item.icon }}</v-icon>
					<span>{{ item.name }}</span>
				</v-btn>
			</v-toolbar-items>
		</v-toolbar>

		<!-- Mobile -->
		<v-toolbar app class="hidden-md-and-up">
			<v-toolbar-side-icon @click="expand = !expand"/>
			<v-toolbar-items>
				<v-btn to="/">
					<v-icon>fas fa-home</v-icon>
				</v-btn>
				<v-btn v-for="item in left" :key="item.name" :to="item.to">{{ item.name }}</v-btn>
			</v-toolbar-items>

			<!-- fix clipping on mobile -->
			<template v-slot:extension v-if="expand">
				<v-toolbar-items>
					<v-btn v-for="item in right" :key="item.name" :href="item.to" flat class="px-0">
						<v-icon>{{ item.pack }} fa-{{ item.icon }}</v-icon>
					</v-btn>
				</v-toolbar-items>
			</template>
		</v-toolbar>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Navbar extends Vue {
	expand = false;

	left = [
		{ name: "Blog", to: "/blog" },
		{ name: "API", to: "/api" }
	];

	right = [
		{ name: "Github", to: "/github", icon: "github", pack: "fab" },
		{
			name: "Email",
			to: "mailto:root@bonusplay.pl",
			icon: "envelope",
			pack: "fas"
		},
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
.theme--dark {
	.v-toolbar {
		background-color: #7b1fa2; // purple darken-2

		* {
			// I'm too lazy to do this manually, so I'm abousing !important
			background-color: #7b1fa2 !important;
			color: @text!important;
		}

		.v-icon {
			// counter hack to my hack, I should really fix this
			background-color: transparent!important;
		}
	}
}
</style>
