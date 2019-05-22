<template>
	<v-app dark id="app">
		<Navbar/>
		<v-content>
			<transition
				name="fade"
				mode="out-in"
				@beforeLeave="beforeLeave"
				@enter="enter"
				@afterEnter="afterEnter"
			>
				<router-view class="main"/>
			</transition>
		</v-content>
		<MyFooter/>
	</v-app>
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
	font-size: 1rem;
	background-color: darken(#303030, 10%);
	color: @text;

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
