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
			<v-divider/>
			<NavDrawerItem v-for="item in middle" :key="item.title" :item="item"/>
		</v-list>
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
			new Item("Polish", "dashboard", "/cv_pl"),
			new Item("English", "dashboard", "/cv_en")
		],
		middle: [
			new Item("Dashboard", "dashboard", "/"),
		],
		bottom: [
			new Item("Github", "github", "/github"),
			new Item("Email", "email", "mailto:root@bonusplay.pl"),
			new Item("Facebook", "facebook", "/facebook"),
			new Item("Discord", "discord", "/discord"),
			new Item("YouTube", "youtube", "/youtube")
		]
	}),
	components: {
		NavDrawerItem
	}
};
</script>