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
			new Item("Home", "dashboard", "/"),
			new Item("Blog", "dashboard", "/blog"),
			new Item("API", "dashboard", "/api")
		],
		cv: [
			new Item("Polish", "dashboard", "/cv_pl", "href"),
			new Item("English", "dashboard", "/cv_en", "href")
		],
		middle: [
			new Item("Notes", "dashboard", "/n"),
			new Item("Food wheel", "dashboard", "/food_wheel")
		],
		bottom: [
			new Item("Github", "github", "/github", "href"),
			new Item("Email", "email", "mailto:root@bonusplay.pl", "href"),
			new Item("Facebook", "facebook", "/facebook", "href"),
			new Item("Discord", "discord", "/discord", "href"),
			new Item("YouTube", "youtube", "/youtube", "href")
		]
	}),
	components: {
		NavDrawerItem
	}
};
</script>