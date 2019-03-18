<template>
	<div id="content">
		<section class="hero">
			<div class="hero-body">
				<div class="title">Blog about everything and nothing</div>
			</div>
		</section>
		<section class="container">
			<div class="tile is-ancestor">
				<div class="tile is-parent is-vertical">
					<article class="tile is-child message is-dark">
						<div class="message-header">
							Reverse Engineering
						</div>
					</article>
					<article class="tile is-child message is-dark">
						<div class="message-header">
							Random
						</div>
						sdfg;kjfgsdjkl;
					</article>
				</div>
				<div class="tile is-parent is-vertical">
					<article class="tile is-child message is-dark">
						<div class="message-header">
							Networking
						</div>
						sdfg;kjfgsdjkl;
					</article>
				</div>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";

@Component({
	components: {
		HelloWorld
	}
})
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
.hero {
	margin-top: 10vh;
	margin-bottom: 2vh;
	background-color: #6b1b80;
}

.message.is-dark {
	background-color: transparent;
}
</style>
