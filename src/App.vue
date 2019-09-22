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