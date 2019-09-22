<template>
	<v-container fluid fill-height>
		<v-layout align-center justify-center>
			<v-flex xs12>
				<video :src="require('@/assets/404.webm')" loop muted autoplay/>
				<h1 class="display-2">404</h1>
				I think you're lost.
			</v-flex>
		</v-layout>
	</v-container>
</template>