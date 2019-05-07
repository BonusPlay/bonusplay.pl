<template>
	<div class="has-text-justified content">
		<wip/>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import wip from "@/components/wip.vue";

@Component({
	components: {
		wip
	}
})
export default class Multiplayer0 extends Vue {}
</script>