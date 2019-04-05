<template>
    <div id="content">
        <section class="hero">
            <div class="hero-body">
                <div class="title">Api documentation</div>
            </div>
        </section>
        <section class="container">
            <wip/>
        </section>
    </div>
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

<style lang="less" scoped>
    .hero {
        margin-top: 10vh;
        margin-bottom: 2vh;
        background-color: #6b1b80;
    }
</style>