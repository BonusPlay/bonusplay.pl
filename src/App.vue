<template>
	<v-app>
		<NavDrawer :open.sync="navDrawerOpen"/>
		<v-content>
			<NavBar :open.sync="navDrawerOpen"/>
			<router-view />
		</v-content>
		<Footer/>
	</v-app>
</template>

<script>
import NavBar from "./components/NavBar";
import NavDrawer from "./components/NavDrawer";
import Footer from "./components/Footer";

export default {
	name: "App",
	data: () => ({
		navDrawerOpen: false
	}),
	created() {
		// open on large devices, closed on smaller ones
		this.navDrawerOpen = this.$vuetify.breakpoint.lgAndUp;
	},
	components: {
		NavBar,
		NavDrawer,
		Footer
	}
};
</script>

<!--
This is NOT scoped CSS, so it's applied to entire website.
It is used to override vuetify's CSS without the need to build entire vuetify SCSS.
-->
<style lang="less">
#app code {
	background-color: #424242; // grey darken-3
}

#app a code {
	color: #AB47BC; // purple lighten-1
}
</style>