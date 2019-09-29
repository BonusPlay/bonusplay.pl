<template>
	<v-list-item :[item.linkType]="item.link" link>
		<v-list-item-icon>
			<v-icon v-if="item.type == 'icon'">
				{{ item.icon }}
			</v-icon>
			
			<v-img v-else :src="item.icon" max-height="24px" max-width="24px"/>
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
	 * @param {('href'|'to')} [linkType]
	 * @param {('img'|'icon')} [type]
	 */
	constructor(title, icon, link, linkType, type)
	{
		this.title = title;
		this.icon = icon;
		this.link = link;
		this.linkType = linkType || 'to';
		this.type = type || 'icon';
	}
}

export default {
	name: "NavDrawerItem",
	props: {
		item: Props
	}
}
</script>