<template>
	<v-container>
		<v-row>
			<v-spacer/>
			<v-col cols="4" md="2" v-for="image in data.images" :key="image">
				<v-img :src="image" aspect-ratio="1" contain/>
			</v-col>
			<v-spacer/>
		</v-row>
	</v-container>
</template>

<script>
export class Props
{
	/**
	 * @param {[String]} images - already required images (or direct links to them)
	 */
	constructor(images)
	{
		this.images = images;
	}
}

export default {
	name: "ImageDisplay",
	props: {
		data: Props
	}
};
</script>