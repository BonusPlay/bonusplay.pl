<template>
	<footer class="footer is-warning">
		<div class="content has-text-centered">
			<strong>
				<i>Copyright © {{new Date().getFullYear()}} BonusPlay</i>
			</strong>
		</div>
	</footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MyFooter extends Vue {}
</script>

<style scoped lang="less">
.footer {
	background-color: #6b1b80;
	padding: 1.5rem;

	strong {
		color: whitesmoke;
	}
}
</style>
