<template>
	<section class="section">
		<div class="container has-text-left">
			<button @click="$router.go(-1)" class="button is-dark">
				<b-icon icon="arrow-left"/>Back
			</button>
			<transition
				name="fade"
				mode="out-in"
				@beforeLeave="beforeLeave"
				@enter="enter"
				@afterEnter="afterEnter"
			>
				<router-view/>
			</transition>
		</div>
	</section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
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

<style lang="less" scoped>
.container {
	margin-top: 5vh;
	margin-bottom: 5vh;
}

.button .icon:first-child:last-child {
	margin-right: 0;
}
</style>