<template>
	<v-list-item :[item.type]="item.link" link>
		<v-list-item-icon>
			<v-icon>mdi-{{ item.icon }}</v-icon>
		</v-list-item-icon>
		<v-list-item-content>
			<v-list-item-title>{{ item.title }}</v-list-item-title>
		</v-list-item-content>
	</v-list-item>
</template>

<script>
export class Props
{
	/**
	 * @param {String} title
	 * @param {String} icon
	 * @param {String} link
	 * @param {('href'|'to')} [type]
	 */
	constructor(title, icon, link, type)
	{
		this.title = title;
		this.icon = icon;
		this.link = link;
		this.type = type || 'to';
	}
}

export default {
	name: "NavDrawerItem",
	props: {
		item: Props
	}
}
</script>