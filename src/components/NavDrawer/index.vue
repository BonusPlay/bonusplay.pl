<template>
	<v-navigation-drawer class="deep-purple accent-4" dark app>
		<v-list>
			<NavDrawerItem v-for="item in top" :key="item.title" :item="item"/>
			<v-list-group prepend-icon="account-details">
				<template v-slot:activator>
					<v-list-item-title>CV</v-list-item-title>
				</template>

				<NavDrawerItem v-for="item in cv" :key="item.title" :item="item"/>
			</v-list-group>
		</v-list>
		<v-divider/>
		<v-list>
			<NavDrawerItem v-for="item in middle" :key="item.title" :item="item"/>
		</v-list>
		<v-divider/>
		<v-list dense align-self-end>
			<NavDrawerItem v-for="item in bottom" :key="item.title" :item="item"/>
		</v-list>
	</v-navigation-drawer>
</template>

<script>
import NavDrawerItem, { Props as Item } from "./Item";

export default {
	name: "NavigationDrawer",
	data: () => ({
		top: [
			new Item("Home", "fas fa-home", "/"),
			new Item("Blog", "fas fa-blog", "/blog"),
			new Item("API", "fas fa-bars", "/api")
		],
		cv: [
			new Item("Polish", "", "/cv_pl", "href"),
			new Item("English", "", "/cv_en", "href")
		],
		middle: [
			new Item("Notes", "fas fa-sticky-note", "/n"),
			new Item("Food wheel", "fas fa-utensils", "/food_wheel")
		],
		bottom: [
			new Item("Github", "fab fa-github", "/github", "href"),
			new Item("Email", "fas fa-envelope", "mailto:root@bonusplay.pl", "href"),
			new Item("Facebook", "fab fa-facebook", "/facebook", "href"),
			new Item("Discord", "fab fa-discord", "/discord", "href"),
			new Item("YouTube", "fab fa-youtube", "/youtube", "href")
		]
	}),
	components: {
		NavDrawerItem
	}
};
</script>