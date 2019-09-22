<template>
	<v-list-item :href="item.link" link>
		<v-list-item-icon>
			<v-icon>mdi-{{ item.icon }}</v-icon>
		</v-list-item-icon>
		<v-list-item-content>
			<v-list-item-title>{{ item.title }}</v-list-item-title>
		</v-list-item-content>
	</v-list-item>
</template>

<script>
export class Props {
	constructor(title, icon, link)
	{
		this.title = title;
		this.icon = icon;
		this.link = link;
	}
}

export default {
	name: "NavDrawerItem",
	props: {
		item: Props
	}
}
</script>