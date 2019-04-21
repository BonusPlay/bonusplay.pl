<template>
	<div id="app">
		<Navbar/>
		<transition
			name="fade"
			mode="out-in"
			@beforeLeave="beforeLeave"
			@enter="enter"
			@afterEnter="afterEnter"
		>
			<router-view class="main"/>
		</transition>
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
export default class App extends Vue {
	prevHeight: string | null = "0";

	beforeLeave(element: any) {
		this.prevHeight = getComputedStyle(element).height;
	}

	enter(element: any) {
		const { height } = getComputedStyle(element);
		element.style.height = this.prevHeight;
		setTimeout(() => {
			element.style.height = height;
		});
	}

	afterEnter(element: any) {
		element.style.height = "auto";
	}
}
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

	.fade-enter-active,
	.fade-leave-active {
		transition-duration: 0.2s;
		transition-property: height, opacity;
		transition-timing-function: ease;
		overflow: hidden;
	}
	
	.fade-enter,
	.fade-leave-to {
		opacity: 0;
	}
}
</style>
