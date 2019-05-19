<template>
	<v-footer class="pa-3">
		<v-spacer/>
		<strong>
			<i>&copy; {{new Date().getFullYear()}} BonusPlay</i>
		</strong>
		<v-spacer/>
	</v-footer>
</template>

<style scoped lang="less">
.theme--dark {
	.v-footer {
		background-color: @primary;

		strong {
			color: whitesmoke;
		}
	}
}
</style>
