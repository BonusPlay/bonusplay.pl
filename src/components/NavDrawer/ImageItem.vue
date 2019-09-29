<template>
	<v-list-item :[item.type]="item.link" link>
		<v-list-item-icon>
			<v-img :src="item.image" max-height="2vh" max-width="2vw"/>
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
	 * @param {String} image
	 * @param {String} link
	 * @param {('href'|'to')} [type]
	 */
	constructor(title, image, link, type)
	{
		this.title = title;
		this.image = image;
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