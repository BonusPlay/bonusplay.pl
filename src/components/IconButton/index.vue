<template>
	<v-btn tile :[data.type]="data.link" :rounded="rounded">
		<v-icon left>{{ data.icon }}</v-icon>
		{{ data.text }}
	</v-btn>
</template>

<script>
export class Props
{
	/**
	 * @param {String} text
	 * @param {String} link
	 * @param {String} icon
	 * @param {('href'|'to')} [type]
	 */
	constructor(text, link, icon, type)
	{
		this.text = text;
		this.link = link;
		this.icon = icon;
		this.type = type;
	}
}

export default {
	name: "IconButton",
	props: {
		data: Props,
		rounded: Boolean
	}
}
</script>