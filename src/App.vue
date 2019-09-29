<template>
	<v-app>
		<NavDrawer/>
		<v-content>
			<router-view />
		</v-content>
		<Footer/>
	</v-app>
</template>

<script>
import NavDrawer from "./components/NavDrawer";
import Footer from "./components/Footer";

export default {
	name: "App",
	components: {
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