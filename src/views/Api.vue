<template>
	<v-container fluid>
		<v-flex>
			<wip/>
		</v-flex>
	</v-container>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
import wip from "@/components/wip.vue";

@Component({
	components: {
		wip
	}
})
	export default class Api extends Vue {}
</script>