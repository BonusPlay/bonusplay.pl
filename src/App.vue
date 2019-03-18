<template>
	<div id="app">
		<Navbar/>
		<router-view class="main"/>
		<MyFooter/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Navbar from "./components/Navbar.vue";
import MyFooter from "./components/Footer.vue";

@Component({
	components: {
		Navbar,
		MyFooter
	}
})
export default class App extends Vue {}
</script>


<style lang="less">
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	background-color: #161616;
	color: #e6e6e6;

	display: flex;
	flex-direction: column;
	min-height: 100vh;

	.main {
		flex: 1;
		padding: 0;
		display: flex;
		flex-wrap: none;
		flex-direction: column;
		flex-wrap: nowrap;
	}

	.title {
		color: whitesmoke;
	}
}
</style>
