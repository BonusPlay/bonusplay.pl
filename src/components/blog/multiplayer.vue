<template>
	<wip/>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import wip from "@/components/wip.vue";

@Component({
	components: {
		wip
	}
})
export default class Multiplayer extends Vue {}
</script>
