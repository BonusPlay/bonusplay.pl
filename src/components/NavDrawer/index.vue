<template>
	<v-navigation-drawer v-model="isOpen" class="deep-purple accent-4" app>
		<v-list>
			<IconItem v-for="item in top" :key="item.title" :item="item"/>
			<v-list-group prepend-icon="account-details">
				<template #activator>
					<v-list-item-title>CV</v-list-item-title>
				</template>

				<IconItem v-for="item in cv" :key="item.title" :item="item"/>
			</v-list-group>
		</v-list>
		<v-divider/>
		<v-list>
			<IconItem v-for="item in middle" :key="item.title" :item="item"/>
		</v-list>
		
		<!-- At bottom -->
		<template #append>
			<v-list dense align-self-end>
				<IconItem v-for="item in bottom" :key="item.title" :item="item"/>
			</v-list>
		</template>
	</v-navigation-drawer>
</template>

<script>
import IconItem, { Props as IconItemProps } from "./IconItem";

export default {
	name: "NavigationDrawer",
	props: {
		open: Boolean
	},
	data: () => ({
		top: [
			new IconItemProps("Home", "fas fa-home", "/"),
			new IconItemProps("Blog", "fas fa-blog", "/blog"),
			new IconItemProps("API", "fas fa-bars", "/api")
		],
		cv: [
			new IconItemProps("Polish", require("@/assets/pl.svg"), "/cv_pl", "href", "img"),
			new IconItemProps("English", require("@/assets/en.svg"), "/cv_en", "href", "img")
		],
		middle: [
			new IconItemProps("Notes", "fas fa-sticky-note", "/n"),
			new IconItemProps("Food wheel", "fas fa-utensils", "/food_wheel")
		],
		bottom: [
			new IconItemProps("Github", "fab fa-github", "/github", "href"),
			new IconItemProps("Email", "fas fa-envelope", "mailto:root@bonusplay.pl", "href"),
			new IconItemProps("LinkedIn", "fab fa-linkedin", "/linkedin", "href"),
			new IconItemProps("Facebook", "fab fa-facebook", "/facebook", "href"),
			new IconItemProps("Discord", "fab fa-discord", "/discord", "href"),
			new IconItemProps("YouTube", "fab fa-youtube", "/youtube", "href")
		]
	}),
	computed: {
		isOpen: {
			get() { return this.open; },
			set(value) { this.$emit('update:open', value) }
		}
	},
	components: {
		IconItem
	}
};
</script>