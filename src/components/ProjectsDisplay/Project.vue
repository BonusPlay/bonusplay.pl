<template>
	<v-card height="100%" class="card">
		<v-card-title primary-title>
			<h3 class="headline mb-0">{{ data.title }}</h3>
		</v-card-title>
		<v-card-text class="grow">
			<span class="text-xs-justify">{{ data.description }}</span>
		</v-card-text>
		<v-card-actions>
			<v-container pa-0>
				<v-row justify="space-around" dense>
					<v-spacer/>
					<v-col v-for="btn in data.buttons" :key="btn.title">
						<IconButton :data="btn" rounded/>
					</v-col>
					<v-spacer/>
				</v-row>
			</v-container>
		</v-card-actions>
	</v-card>
</template>

<script>
import IconButton, { Props as IconButtonProps } from "../IconButton";

export class Props {
	/**
	 * @param {string} title
	 * @param {string} description
	 * @param {[IconButtonProps]} buttons
	 */
	constructor(title, description, buttons) {
		this.title = title;
		this.description = description;
		this.buttons = buttons;
	}
}

export default {
	name: "Project",
	props: {
		data: Props
	},
	components: {
		IconButton
	}
};
</script>

<style lang="less" scoped>
.card {
	display: flex;
	flex-direction: column;
}
</style>